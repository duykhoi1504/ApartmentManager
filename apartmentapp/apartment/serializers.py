from rest_framework import serializers
from apartment.models import PhanAnh,HangHoa,HoaDon,TuDoDienTu,PhieuKhaoSat,DapAnKhaoSat


class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        # để hiển thị dường dân tuyệt đối của ảnh trên swagger
        rep = super().to_representation(instance)
        image = instance.image
        if image:
            rep['image'] = image.url
        return rep
class HoaDonSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoaDon
        fields = 'id', 'name', 'thongTinHD', 'payment_image', 'created_date', 'status', 'dichVu'
class PhanAnhSerializer(serializers.ModelSerializer):
    class Meta:
        model=PhanAnh
        fields='__all__'


class HangHoaSerializer(ItemSerializer):
    class Meta:
        model=HangHoa
        fields='id','name','image','created_date','active','tuDo','status'

class TuDoDienTuSerializer(serializers.ModelSerializer):

    class Meta:
        model=TuDoDienTu
        fields='id','name','created_date','updated_date','active','user'

class PhieuKhaoSatSerializer(serializers.ModelSerializer):
    class Meta:
        model=PhieuKhaoSat
        fields='__all__'

class DapAnKhaoSatSerializer(serializers.ModelSerializer):
    class Meta:
        model=DapAnKhaoSat
        fields='__all__'