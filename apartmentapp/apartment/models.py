from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.db.models import Count

# Create your models here.


class User(AbstractUser):

    STATUS_CHOICES = (
        ('admin', 'quản trị viên'),
        ('resident', 'cư dân')
    )
    avatar= CloudinaryField(null=True)
    role = models.CharField(max_length=20, choices=STATUS_CHOICES,default='resident')

    def save(self, *args, **kwargs):
        #*args cho phép bạn truyền vào một số lượng không xác định các tham số trong hàm.
        #**kwargs cho phép bạn truyền vào một số lượng không xác định các tham số dưới dạng cặp khóa-giá trị.
        # Tự động set role dựa trên is_superuser
        if self.is_superuser:
            self.role = 'admin'
        elif self.role == 'admin' and not self.is_superuser:
            self.role = 'resident'
        super().save(*args, **kwargs)
        #*args sẽ thu thập tất cả các tham số không được đặt tên và đóng gói chúng thành một tuple.
        #**kwargs sẽ thu thập tất cả các tham số được đặt tên và đóng gói chúng thành một dictionary.
        #Sau đó, super().save(*args, **kwargs) sẽ truyền tất cả các tham số thu thập được vào hàm save() của lớp cha (AbstractUser).



class BaseModel(models.Model):
    created_date=models.DateTimeField(auto_now_add=True,null=True)
    updated_date=models.DateTimeField(auto_now=True,null=True)
    active=models.BooleanField(default=True)

    class Meta:
        abstract= True;


class PhanAnh(BaseModel):
    name=models.CharField(max_length=50,null=True)
    noiDung=RichTextField()
    # image = models.ImageField(upload_to='PhanAnh/%Y/%m',null=True)
    image= CloudinaryField(null=True,blank=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    def __str__(self):
        return self.name

class CanHo(BaseModel):
    STATUS_CHOICES = (
        ('vip', 'căn hộ cao cấp'),
        ('normal', 'căn hộ thường')
    )
    name = models.CharField(max_length=50, null=True)
    vitri=RichTextField()
    loaiCanHo=models.CharField(max_length=50,choices=STATUS_CHOICES,default='normal')
    giaBan=models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    userMembers = models.ManyToManyField(User, null=True, related_name='thanh_vien_can_ho')
    def __str__(self):
        return f"{self.name}-{self.user.username}"

# class LoaiCanHo(BaseModel):
#     name = models.CharField(max_length=50, null=True)
#     def __str__(self):
#         return self.name


class TuDoDienTu(BaseModel):
    name=models.CharField(max_length=50,null=True)
    canho = models.ForeignKey(CanHo, on_delete=models.CASCADE, null=True,related_name='tu_do_dien_tu')

    def __str__(self):
        return self.name

class HangHoa(BaseModel):
    STATUS_CHOICES = (
        ('waiting','Chờ nhận hàng'),
        ('received','Đã nhận hàng'),
    )
    name=models.CharField(max_length=50,null=True)
    # image = models.ImageField(upload_to='HangHoa/%Y/%m',null=True)
    image = CloudinaryField(null=True,blank=True)
    tuDo=models.ForeignKey(TuDoDienTu,on_delete=models.CASCADE,related_name='hang_hoa')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='waiting')
    def __str__(self):
        return f'{self.name} - status: {self.status}'

class PhieuKhaoSat(BaseModel):
    tieuDe = models.CharField(max_length=50, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='phieu_khao_sat')

    def __str__(self):
        return self.tieuDe

class CauHoiKhaoSat(BaseModel):
    phieukhaosat = models.ForeignKey(PhieuKhaoSat, on_delete=models.CASCADE, null=True, related_name='cau_hoi_khao_sat')
    cauHoi = RichTextField()

    def __str__(self):
        return self.cauHoi

class DapAnKhaoSat(BaseModel):
    phieukhaosat = models.ForeignKey(PhieuKhaoSat, on_delete=models.CASCADE, null=True, related_name='dap_an_khao_sat')
    cauhoikhaosat = models.ForeignKey(CauHoiKhaoSat, on_delete=models.CASCADE, null=True, related_name='dap_an_khao_sat')
    dapAn = RichTextField(null=True)

    def __str__(self):
        return f'{self.phieukhaosat.tieuDe} -{self.cauhoikhaosat.cauHoi} - {self.dapAn}'
# class PhieuKhaoSat(BaseModel):
#     tieuDe = models.CharField(max_length=50, null=True)
#     user=models.ForeignKey(User, on_delete=models.CASCADE,null=True)
#
#     def __str__(self):
#         return self.tieuDe
#
# class CauHoiKhaoSat(BaseModel):
#     phieukhaosat = models.ForeignKey(PhieuKhaoSat, on_delete=models.CASCADE,null=True)
#     cauHoi = RichTextField()
#
#     def __str__(self):
#         return self.cauHoi
#
# class DapAnKhaoSat(BaseModel):
#     phieukhaosat = models.ForeignKey(PhieuKhaoSat, on_delete=models.CASCADE,null=True)
#     cauhoikhaosat = models.ForeignKey(CauHoiKhaoSat, on_delete=models.CASCADE,null=True)
#     dapAn =RichTextField()
#
#     def __str__(self):
#         return self.dapAn

class DichVu(BaseModel):
    name = models.CharField(max_length=50, null=True)
    thongTinDV=RichTextField()
    giaDV=models.FloatField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    #add
    # users = models.ManyToManyField(User)
    def __str__(self):
        return self.name


class HoaDon(BaseModel):

    STATUS_CHOICES = (
        ('pending', 'Chờ xử lý'),
        ('paid', 'Đã đóng tiền')
    )
    name = models.CharField(max_length=50, null=True,blank=True)
    thongTinHD=RichTextField()
    # tongTien=models.FloatField()
    payment_image = CloudinaryField(null=True,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True,related_name='hoa_don',blank=True)
    # dichVu = models.ManyToManyField(DichVu)
    dichVu = models.ManyToManyField(DichVu,related_name='hoa_don',blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')


    def save(self, *args, **kwargs):
        if not self.name:
            # Lấy số lượng hoá đơn hiện có
            count = HoaDon.objects.count()
            self.name = f'HD{count + 1}'

        # Kiểm tra trường payment_image và cập nhật trạng thái status
        if self.payment_image:
            self.status = 'paid'
        else:
            self.status = 'pending'

        super().save(*args, **kwargs)
    def __str__(self):
        return f'{self.name}-{self.user.username} '


    def tongTien(self):
        dich_vu = self.dichVu.all()
        tong_tien = sum([dv.giaDV for dv in dich_vu])
        return tong_tien



class HopDong(BaseModel):
    name = models.CharField(max_length=50, null=True)
    thongtinHD=RichTextField()
    tienDatCoc=models.FloatField()
    canHo=models.ForeignKey(CanHo, on_delete=models.CASCADE, null=True)
    user= models.ForeignKey(User, on_delete=models.CASCADE,null=True ,related_name='hop_dong')

    def __str__(self):
        return self.name
class NguoiThan(BaseModel):
    STATUS_CHOICES = (
        ('pending', 'Chờ xử lý'),
        ('pass', 'Đăng ký thành công')
    )
    name = models.CharField(max_length=100)
    cccd = models.CharField(max_length=20, unique=True)
    sdt = models.CharField(max_length=15)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nguoi_than')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    def __str__(self):
        return f'{self.name} -người thân của: {self.user.username}'
class TheGiuXe(BaseModel):
    nguoithan = models.OneToOneField(NguoiThan, on_delete=models.CASCADE,related_name='the_giu_xe')

    def __str__(self):
        return f'{self.id} - thẻ giữ xe của: {self.nguoithan}'

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            self.nguoithan.status = 'pass'
            self.nguoithan.save()