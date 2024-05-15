from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.db.models import Count
# Create your models here.
class User(AbstractUser):
    avatar= CloudinaryField(null=True)

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

class TuDoDienTu(BaseModel):
    name=models.CharField(max_length=50,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

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
    tuDo=models.ForeignKey(TuDoDienTu,on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='waiting')
    def __str__(self):
        return self.name

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
    dapAn = RichTextField()

    def __str__(self):
        return self.dapAn
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
    users = models.ManyToManyField(User)
    def __str__(self):
        return self.name


class HoaDon(BaseModel):
    STATUS_CHOICES = (
        ('pending', 'Chờ xử lý'),
        ('paid', 'Đã đóng tiền')
    )
    name = models.CharField(max_length=50, null=True)
    thongTinHD=RichTextField()
    # tongTien=models.FloatField()
    payment_image = CloudinaryField(null=True,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True,related_name='hoa_don')
    # dichVu = models.ManyToManyField(DichVu)
    dichVu = models.ForeignKey(DichVu, on_delete=models.CASCADE,null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    def __str__(self):
        return self.name

    def tongTien(self):
        dich_vu = self.dichVu.all()
        tong_tien = sum([dv.giaDV for dv in dich_vu])
        return tong_tien

class CanHo(BaseModel):
    name = models.CharField(max_length=50, null=True)
    vitri=RichTextField()
    loaiCanHo=models.CharField(max_length=50)
    giaBan=models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class HopDong(BaseModel):
    name = models.CharField(max_length=50, null=True)
    thongtinHD=RichTextField()
    tienDatCoc=models.FloatField()
    canHo=models.ForeignKey(CanHo, on_delete=models.CASCADE, null=True)
    user=models.ManyToManyField(User)

    def __str__(self):
        return self.name
