from django.shortcuts import render
from rest_framework import viewsets, generics, status,parsers,permissions
from apartment import serializers, paginators,perms
from apartment.models import (PhanAnh, HangHoa, HoaDon,DichVu, TuDoDienTu,
                              PhieuKhaoSat, DapAnKhaoSat, CauHoiKhaoSat,User,NguoiThan,CanHo)
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
class UserViewSet(viewsets.ViewSet,generics.CreateAPIView,generics.ListAPIView,generics.RetrieveAPIView):
    # queryset = User.objects.filter(is_active=True)
    queryset = User.objects.all()

    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser,]
    # permission_classes = [perms.AdminOwner]
    #or co the viet ham xac thuc duoi day


    def get_permissions(self):
        if self.action in ['set_active','delete_user']:
            return [permissions.IsAdminUser()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-user', detail=False)
    def get_current_user(self, request):

        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
                # setattr() được sử dụng để gán giá trị v cho thuộc tính có tên k trên đối tượng user
                setattr(user, k, v)
            user.save()

        return Response(serializers.UserSerializer(user).data)

    @action(methods=['delete'], url_path='delete-user', detail=True)
    def delete_user(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except User.DoesNotExist:
            return Response({"detail": "No User matches the given query."}, status=status.HTTP_404_NOT_FOUND)

        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    @action(methods=['post'], url_path='nguoithans', detail=True)
    def add_nguoithan(self, request, pk):

        #hang_hoa là trong related_name ben model
        c=self.get_object().nguoi_than.create(name=request.data.get('name'),
                                              cccd=request.data.get('cccd'),
                                              sdt=request.data.get('sdt'),
                                              )
        return Response(serializers.NguoiThanSerializer(c).data,status=status.HTTP_201_CREATED)

    @action(methods=['patch'], url_path='setactive', detail=True)
    def set_active(self,request,pk):
        instance = self.get_object()
        instance.is_active= not instance.is_active
        instance.save()
        return Response(serializers.UserSerializer(instance).data)

class HoaDonViewSet(viewsets.ViewSet, generics.RetrieveAPIView,generics.CreateAPIView,generics.ListAPIView):
    queryset = HoaDon.objects.all()
    serializer_class = serializers.HoaDonSerializer
    # permission_classes = [perms.HoaDonOwner]
    pagination_class =paginators.HoaDonPaginator

    def get_queryset(self):
        # Get Hang hoa theo name và get hang hoa theo từng mã tủ đồ
        # queryset=HoaDon.objects.filter(status='pending')
        queryset = self.queryset
        status = self.request.query_params.get('status')
        user_id = self.request.query_params.get('user_id')
        if status:
            queryset = queryset.filter(status=status)
        if user_id:
            queryset = queryset.filter(user__id=user_id)
        return queryset
    def create(self, request, *args, **kwargs):
        # Lấy người dùng hiện tại
        user = request.user

        # Tạo bản ghi mới
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    @action(methods=['get'], url_path='dichvus', detail=True)
    def get_dichvus(self, request, pk=None):
        dichvus = self.get_object().dichVu.filter(active=True)
        serializer = serializers.DichVuSerializer(dichvus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    @action(methods=['patch'], url_path='upuynhiemchi', detail=True)
    def up_uynhiemchi(self, request, pk=None):
        hoa_don = self.get_object()
        payment_image = request.data.get('payment_image')

        if payment_image:
            hoa_don.payment_image = payment_image
            hoa_don.save()
            return Response(serializers.HoaDonSerializer(hoa_don).data)
        else:
            return Response({'error': 'Không tìm thấy hình ảnh thanh toán.'}, status=status.HTTP_400_BAD_REQUEST)


class PhanAnhViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = PhanAnh.objects.all()
    # queryset = PhanAnh.objects.filter(active=True)
    serializer_class = serializers.PhanAnhSerializer
    pagination_class = paginators.PhanAnhPaginator
    # get_permissions: chỉ user đã chứng thực mới được phép thêm phản ánh
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    # get_permissions: tự động gắn user_id của người tạo phản ánh
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HangHoaViewSet(viewsets.ViewSet, generics.ListAPIView,generics.RetrieveAPIView):
    queryset = HangHoa.objects.filter(active=True)
    # queryset = HangHoa.objects.filter(status='waiting')
    serializer_class = serializers.HangHoaSerializer
    pagination_class = paginators.HangHoaPaginator

    def get_queryset(self):
        # Get Hang hoa theo name và get hang hoa theo từng mã tủ đồ
        queryset = self.queryset
        q = self.request.query_params.get('q')
        tudo_id = self.request.query_params.get('tuDo')
        status_hanghoa = self.request.query_params.get('status')
        if q:
            queryset = queryset.filter(name__icontains=q)
        if tudo_id:
            queryset = queryset.filter(tuDo=tudo_id)
        if status_hanghoa:
            queryset = queryset.filter(status=status_hanghoa)
        return queryset


class TuDoDienTuViewSet(viewsets.ViewSet,generics.ListAPIView, generics.RetrieveAPIView,generics.DestroyAPIView):
    queryset = TuDoDienTu.objects.filter(active=True)
    serializer_class = serializers.TuDoDienTuSerializer
    # permission_classes = [perms.TuDoOwner]

    def get_permissions(self):
        if self.action == 'add_hanghoa':
            return [permissions.IsAdminUser()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='hanghoas', detail=True)
    def get_hanghoas(self, request, pk):
        hanghoas = self.get_object().hanghoa_set.filter(status='received')
        return Response(serializers.HangHoaSerializer(hanghoas, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='hanghoas', detail=True)
    def add_hanghoa(self, request, pk):

        #hang_hoa là trong related_name ben model
        c=self.get_object().hang_hoa.create(name=request.data.get('name'),
                                              image=request.data.get('image'))
        return Response(serializers.HangHoaSerializer(c).data,status=status.HTTP_201_CREATED)



class PhieuKhaoSatViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, generics.CreateAPIView):
    queryset = PhieuKhaoSat.objects.all()
    serializer_class = serializers.PhieuKhaoSatSerializer

    def get_permissions(self):
        if self.action == 'add_cauhoikhaosat':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    @action(methods=['post'], url_path='cauhois', detail=True)
    def add_cauhoikhaosat(self, request, pk):
        phieu_khao_sat = self.get_object()
        cauhoi = CauHoiKhaoSat.objects.create(phieukhaosat_id=phieu_khao_sat.id, cauHoi=request.data.get('cauHoi'))
        return Response(serializers.CauHoiKhaoSatSerializer(cauhoi).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path=r'dapans/(?P<cauhoikhaosat_id>\d+)', detail=True)
    def add_dapan(self, request, pk,cauhoikhaosat_id):
        phieu_khao_sat = self.get_object()
        cauhoi = CauHoiKhaoSat.objects.get(pk=cauhoikhaosat_id)
        dapan = DapAnKhaoSat.objects.create(
            phieukhaosat_id=phieu_khao_sat.id,
            cauhoikhaosat=cauhoi,
            dapAn=request.data.get('dapAn'),
            active=True
        )
        return Response(serializers.DapAnKhaoSatSerializer(dapan).data, status=status.HTTP_201_CREATED)

class CauHoiKhaoSatViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = CauHoiKhaoSat.objects.all()
    serializer_class = serializers.CauHoiKhaoSatSerializer

class DapAnKhaoSatViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = DapAnKhaoSat.objects.all()
    serializer_class = serializers.DapAnKhaoSatSerializer


# class PhieuKhaoSatViewSet(viewsets.ViewSet,generics.RetrieveAPIView):
#     queryset = PhieuKhaoSat.objects.filter(active=True)
#     serializer_class = serializers.PhieuKhaoSatSerializer

# @action(methods=['get'], url_path='dapankhaosats', detail=True)
# def get_dapankhaosats(self, request, pk):
#     dapankhaosats = self.get_object().dapankhaosat_set.filter(active=True)
#     return Response(serializers.DapAnKhaoSatSerializer(dapankhaosats, many=True).data, status=status.HTTP_200_OK)
#
# @action(methods=['get'], url_path='cauhoikhaosats', detail=True)
# def get_cauhoikhaosats(self, request, pk):
#     cauhoikhaosats = self.get_object().cauhoikhaosat_set.filter(active=True)
#     return Response(serializers.CauHoiKhaoSatSerializer(cauhoikhaosats, many=True).data, status=status.HTTP_200_OK)
#
# @action(methods=['get'], url_path='cauhoi-dapan', detail=True)
# def get_cauhoi_dapan(self, request, pk):
#     phieukhaosat = self.get_object()
#     cauhoikhaosats = phieukhaosat.cauhoikhaosat_set.all()
#     dapankhaosats = phieukhaosat.dapankhaosat_set.filter(active=True)
#
#     data = {
#         'phieu_khao_sat': serializers.PhieuKhaoSatSerializer(phieukhaosat).data,
#         'cau_hoi': serializers.CauHoiKhaoSatSerializer(cauhoikhaosats, many=True).data,
#         'dap_an': serializers.DapAnKhaoSatSerializer(dapankhaosats, many=True).data
#     }
#     return Response(data, status=status.HTTP_200_OK)

class NguoiThanViewSet(viewsets.ViewSet, generics.CreateAPIView,generics.ListAPIView):
    # queryset = User.objects.filter(is_active=True)
    queryset = NguoiThan.objects.all()
    serializer_class = serializers.NguoiThanSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def create(self, request, *args, **kwargs):
        # Lấy người dùng hiện tại
        user = request.user

        # Tạo bản ghi mới
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class DichVuViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = DichVu.objects.all()
    serializer_class = serializers.DichVuSerializer
    pagination_class = paginators.DichVuPaginator

    def get_queryset(self):
        # Get Hang hoa theo name và get hang hoa theo từng mã tủ đồ
        queryset = self.queryset
        q = self.request.query_params.get('q')
        if q:
            queryset = queryset.filter(name__icontains=q)
        return queryset
class CanHoViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = CanHo.objects.all()
    serializer_class = serializers.CanHoSerializer

