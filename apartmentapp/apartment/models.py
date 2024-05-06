from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
# Create your models here.
class User(AbstractUser):
    pass

class BaseModel(models.Model):
    created_date=models.DateTimeField(auto_now_add=True,null=True)
    updated_date=models.DateTimeField(auto_now=True,null=True)
    active=models.BooleanField(default=True)

    class Meta:
        abstract= True;


class PhanAnh(BaseModel):
    name=models.CharField(max_length=50,null=True)
    noiDung=RichTextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)

    def __str__(self):
        return self.name

class TuDoDienTu(BaseModel):
    name=models.CharField(max_length=50,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class HangHoa(BaseModel):
    name=models.CharField(max_length=50,null=True)
    tuDo=models.ForeignKey(TuDoDienTu,on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class PhieuKhaoSat(BaseModel):
    name = models.CharField(max_length=50, null=True)
    noiDung = RichTextField()
    pks_user=models.ManyToManyField(User)

    def __str__(self):
        return self.name


class DichVu(BaseModel):
    name = models.CharField(max_length=50, null=True)
    thongTinDV=RichTextField()
    giaDV=models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class HoaDon(BaseModel):
    name = models.CharField(max_length=50, null=True)
    thongTinHD=RichTextField()
    tongTien=models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    dichvu_hoadon = models.ManyToManyField(DichVu)

    def __str__(self):
        return self.name

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
    hopdong_user=models.ManyToManyField(User)

    def __str__(self):
        return self.name
