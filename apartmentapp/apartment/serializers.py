from rest_framework import serializers
from apartment.models import (PhanAnh, HangHoa, HoaDon,DichVu, TuDoDienTu,
                              PhieuKhaoSat, DapAnKhaoSat, CauHoiKhaoSat,User,NguoiThan,CanHo)

class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        data=validated_data.copy()

        user=User(**data)
        user.set_password(data["password"])
        user.save()

        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        image_url = representation.get('avatar')
        cloudinary_base_url = "https://res.cloudinary.com/dawe6629q/"

        if image_url and not image_url.startswith('http'):
            # Prepend the Cloudinary base URL if not already included
            image_url = cloudinary_base_url + image_url
            representation['avatar'] = image_url

        return representation

    class Meta:
        model=User
        fields=['id','first_name','last_name','email','username','password','avatar','date_joined','last_login','role','is_active']
        # fields='__all__'

        extra_kwargs={
            'password':{
                'write_only':True
            }
        }

class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        # để hiển thị dường dân tuyệt đối của ảnh trên swagger
        rep = super().to_representation(instance)
        image = instance.image
        if image:
            rep['image'] = image.url
        return rep

class DichVuSerializer(serializers.ModelSerializer):
    class Meta:
        model = DichVu
        fields = ['id', 'name', 'thongTinDV', 'giaDV']

class HoaDonSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    dichVu = serializers.PrimaryKeyRelatedField(queryset=DichVu.objects.all(), many=True, write_only=True)
    dichVu_details = DichVuSerializer(source='dichVu', many=True, read_only=True)
    # dichVu = serializers.PrimaryKeyRelatedField(queryset=DichVu.objects.all(), many=True)
    tongTien = serializers.SerializerMethodField()
    class Meta:
        model = HoaDon
        fields = ['id', 'name', 'thongTinHD', 'payment_image', 'created_date', 'status', 'dichVu', 'dichVu_details','tongTien','user']

    def get_tongTien(self, obj):
        return obj.tongTien()

    def create(self, validated_data):
        dichVu_data = validated_data.pop('dichVu')
        hoadon = HoaDon.objects.create(**validated_data)
        # Thiết lập mối quan hệ nhiều-nhiều
        hoadon.dichVu.set(dichVu_data)
        hoadon.save()
        return hoadon


class PhanAnhSerializer(ItemSerializer):
    user  = UserSerializer( read_only=True)
    class Meta:
        model = PhanAnh
        fields = ['id', 'name', 'noiDung', 'image', 'user_id','user']

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     image_url = representation.get('image')
    #     cloudinary_base_url = "https://res.cloudinary.com/dawe6629q/"
    #
    #     if image_url and not image_url.startswith('http'):
    #         # Prepend the Cloudinary base URL if not already included
    #         image_url = cloudinary_base_url + image_url
    #         representation['image'] = image_url
    #
    #     return representation


class HangHoaSerializer(ItemSerializer):
    class Meta:
        model = HangHoa
        fields = 'id', 'name', 'image', 'created_date', 'active', 'tuDo', 'status'

class CanHoSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    userMembers = UserSerializer(many=True)

    class Meta:
        model = CanHo
        fields = ['id', 'name', 'vitri', 'loaiCanHo', 'giaBan', 'user', 'userMembers']
class TuDoDienTuSerializer(serializers.ModelSerializer):
    hang_hoa=HangHoaSerializer(many=True)
    # canho = CanHoSerializer()
    users = serializers.SerializerMethodField()
    class Meta:
        model = TuDoDienTu
        fields = ['id', 'name', 'created_date', 'updated_date', 'active', 'canho','hang_hoa','users']
    def get_users(self, obj):
        users = obj.get_users()
        return UserSerializer(users, many=True).data

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
        fields = ['id','dapAn']

class CauHoiKhaoSatSerializer(serializers.ModelSerializer):
    dap_an_khao_sat = DapAnKhaoSatSerializer(many=True)

    class Meta:
        model = CauHoiKhaoSat
        fields = ['id', 'cauHoi', 'dap_an_khao_sat']

class PhieuKhaoSatSerializer(serializers.ModelSerializer):
    cau_hoi_khao_sat = CauHoiKhaoSatSerializer(many=True)

    class Meta:
        model = PhieuKhaoSat
        fields = ['tieuDe', 'cau_hoi_khao_sat', 'created_date', 'updated_date', 'active', 'user']

class NguoiThanSerializer(serializers.ModelSerializer):
    class Meta:
        model = NguoiThan
        fields = ['id', 'name','cccd','sdt', 'created_date', 'updated_date', 'active','user_id', 'status']

