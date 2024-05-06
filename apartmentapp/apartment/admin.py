from django.contrib import admin
from apartment.models import PhanAnh,PhieuKhaoSat,TuDoDienTu,HangHoa,DichVu,CanHo,HoaDon,HopDong
from django.utils.html import mark_safe
# Register your models here.

class MyPhanAnhAdmin(admin.ModelAdmin):
    list_display = ['id','name','noiDung','created_date','updated_date','active']
    search_fields = ['name']
    list_filter = ['id','created_date','name']
    readonly_fields = ['my_image']

    def my_image(self,instance):
        if instance:
            # instance.image.name  đề cập đến thuộc tính image của đối tượng instance và trả về tên tệp của hình ảnh đó.
            return mark_safe(f"<img width='400' src='/static/{instance.image.name}'/>")


class MyHangHoaAdmin(admin.ModelAdmin):
    readonly_fields = ['my_image']

    def my_image(self,instance):
        if instance:
            # instance.image.name  đề cập đến thuộc tính image của đối tượng instance và trả về tên tệp của hình ảnh đó.
            return mark_safe(f"<img width='400' src='/static/{instance.image.name}'/>")


class MyPhieuKhaoSatAdmin(admin.ModelAdmin):
    readonly_fields = ['my_image']

    def my_image(self,instance):
        if instance:
            # instance.image.name  đề cập đến thuộc tính image của đối tượng instance và trả về tên tệp của hình ảnh đó.
            return mark_safe(f"<img width='400' src='/static/{instance.image.name}'/>")


admin.site.register(PhanAnh,MyPhanAnhAdmin)
admin.site.register(PhieuKhaoSat,MyPhieuKhaoSatAdmin)
admin.site.register(TuDoDienTu)
admin.site.register(HangHoa,MyHangHoaAdmin)
admin.site.register(DichVu)
admin.site.register(CanHo)
admin.site.register(HoaDon)
admin.site.register(HopDong)
