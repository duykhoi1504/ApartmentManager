from django.contrib import admin
from apartment.models import (PhanAnh, PhieuKhaoSat, TuDoDienTu, HangHoa,
                              DichVu, CanHo, HoaDon, HopDong, CauHoiKhaoSat, DapAnKhaoSat,
                              TheGiuXe, NguoiThan, User)
from django.utils.html import mark_safe
from django.urls import path
from django.db.models import Count, Sum
from django.template.response import TemplateResponse


class MyApartmentAdminSite(admin.AdminSite):
    site_header = 'ApartmentManager'

    def get_urls(self):
        return [path('apartment-stats/', self.stats_view)] + super().get_urls()

    def stats_view(self, request):
        apartmentdetail_stats = CanHo.objects.all()
        apartment_stats = CanHo.objects.values('active').annotate(
            count=Count('id'),
            # total_price=Sum('giaBan')
        ).order_by('-count')

        total_residents = User.objects.filter(role='resident').count()
        residents_in_vip_apartment = CanHo.objects.filter(loaiCanHo='vip').aggregate(
            v_residents=Count('userMembers')
        )
        residents_in_normal_apartment = CanHo.objects.filter(loaiCanHo='normal').aggregate(
            n_residents=Count('userMembers')
        )
        can_ho_userMembers = CanHo.userMembers.through.objects.all().order_by('user_id')

        hoa_don = HoaDon.objects.annotate(count=Sum('dichVu__giaDV')).values("id", "name", "count")

        hoa_don_dich_vu = HoaDon.dichVu.through.objects.all()
        dich_vu = DichVu.objects.all()

        phieu_khao_sat = PhieuKhaoSat.objects.all().prefetch_related('cau_hoi_khao_sat__dap_an_khao_sat')
        cau_hoi_dap_an = []
        for pks in phieu_khao_sat:
            cauHoi = []
            for q in pks.cau_hoi_khao_sat.all():
                cauHoi.append({
                    'cau_hoi': q.cauHoi,
                    'so_dap_an': q.dap_an_khao_sat.count()
                })
            cau_hoi_dap_an.append({
                'tieuDe': pks.tieuDe,
                'cauHoi': cauHoi
            })

        return TemplateResponse(request, 'admin/stats.html', {
            "apartment_stats": apartment_stats,
            "apartmentdetail_stats": apartmentdetail_stats,
            "hoa_don": hoa_don,
            "hoa_don_dich_vu": hoa_don_dich_vu,
            "dich_vu": dich_vu,
            "total_residents": total_residents,
            "residents_in_vip_apartment": residents_in_vip_apartment,
            "residents_in_normal_apartment": residents_in_normal_apartment,
            "can_ho_userMembers": can_ho_userMembers,
            'cau_hoi_dap_an': cau_hoi_dap_an,
        })


admin_site = MyApartmentAdminSite(name='MyApartment')


# Register your models here.

class MyPhanAnhAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'noiDung', 'created_date', 'updated_date', 'active']
    search_fields = ['name']
    list_filter = ['id', 'created_date', 'name']
    readonly_fields = ['my_image']

    def my_image(self, instance):
        if instance:
            # instance.image.name  đề cập đến thuộc tính image của đối tượng instance và trả về tên tệp của hình ảnh đó.
            return mark_safe(f"<img width='400' src='/static/{instance.image.name}'/>")


class MyHangHoaAdmin(admin.ModelAdmin):
    readonly_fields = ['my_image']

    def my_image(self, instance):
        if instance:
            # instance.image.name  đề cập đến thuộc tính image của đối tượng instance và trả về tên tệp của hình ảnh đó.
            return mark_safe(f"<img width='400' src='/static/{instance.image.name}'/>")


admin_site.register(PhanAnh, MyPhanAnhAdmin)
admin_site.register(PhieuKhaoSat)
admin_site.register(TuDoDienTu)
admin_site.register(HangHoa, MyHangHoaAdmin)
admin_site.register(DichVu)
admin_site.register(CanHo)
admin_site.register(HoaDon)
admin_site.register(HopDong)
admin_site.register(CauHoiKhaoSat)
admin_site.register(DapAnKhaoSat)
admin_site.register(TheGiuXe)
admin_site.register(NguoiThan)
admin_site.register(User)
