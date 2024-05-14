from rest_framework import serializers
from apartment.models import PhanAnh, HangHoa, HoaDon, TuDoDienTu, PhieuKhaoSat, DapAnKhaoSat, CauHoiKhaoSat


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
        model = PhanAnh
        fields = '__all__'


class HangHoaSerializer(ItemSerializer):
    class Meta:
        model = HangHoa
        fields = 'id', 'name', 'image', 'created_date', 'active', 'tuDo', 'status'


class TuDoDienTuSerializer(serializers.ModelSerializer):
    class Meta:
        model = TuDoDienTu
        fields = 'id', 'name', 'created_date', 'updated_date', 'active', 'user'


# class PhieuKhaoSatSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PhieuKhaoSat
#         fields = ['id', 'created_date', 'updated_date', 'active', 'tieuDe']
#
#
# class CauHoiKhaoSatSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CauHoiKhaoSat
#         fields = ['id', 'cauHoi']
#
#
# class DapAnKhaoSatSerializer(serializers.ModelSerializer):
#     cauhoi = CauHoiKhaoSatSerializer
#     class Meta:
#         model = DapAnKhaoSat
#         fields = ['id', 'dapAn', 'active', 'cauhoi']
class DapAnKhaoSatSerializer(serializers.ModelSerializer):
    class Meta:
        model = DapAnKhaoSat
        fields = ['dapAn']

class CauHoiKhaoSatSerializer(serializers.ModelSerializer):
    dap_an_khao_sat = DapAnKhaoSatSerializer(many=True, read_only=True)

    class Meta:
        model = CauHoiKhaoSat
        fields = ['cauHoi', 'dap_an_khao_sat']

class PhieuKhaoSatSerializer(serializers.ModelSerializer):
    cau_hoi_khao_sat = CauHoiKhaoSatSerializer(many=True, read_only=True)

    class Meta:
        model = PhieuKhaoSat
        fields = ['tieuDe', 'cau_hoi_khao_sat', 'created_date', 'updated_date', 'active', 'user']