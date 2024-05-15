from django.shortcuts import render
from rest_framework import viewsets, generics, status,parsers,permissions
from apartment import serializers, paginators
from apartment.models import PhanAnh, HangHoa, HoaDon,DichVu, TuDoDienTu, PhieuKhaoSat, DapAnKhaoSat, CauHoiKhaoSat,User
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
class UserViewSet(viewsets.ViewSet,generics.CreateAPIView):
    # queryset = User.objects.filter(is_active=True)
    queryset = User.objects.all()

    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser,]

    def get_permissions(self):
        if self.action in ['get_current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current-user', detail=False)
    def get_current_user(self, request):

        user = request.user
        if request.method.__eq__('PATCH'):
            for k, v in request.data.items():
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


class HoaDonViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = HoaDon.objects.filter(active=True)
    serializer_class = serializers.HoaDonSerializer

    def get_queryset(self):
        # Get Hang hoa theo name và get hang hoa theo từng mã tủ đồ
        # queryset=HoaDon.objects.filter(status='pending')
        queryset = self.queryset
        q = self.request.query_params.get('status')
        if q:
            queryset = queryset.filter(status=q)

        return queryset

    @action(methods=['get'], url_path='dichvus', detail=True)
    def get_dichvus(self, request, pk=None):
        dichvus = self.get_object().dichVu.filter(active=True)
        serializer = serializers.DichVuSerializer(dichvus, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class PhanAnhViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = PhanAnh.objects.filter(active=True)
    serializer_class = serializers.PhanAnhSerializer


class HangHoaViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = HangHoa.objects.filter(active=True)
    serializer_class = serializers.HangHoaSerializer
    pagination_class = paginators.HangHoaPaginator

    def get_queryset(self):
        # Get Hang hoa theo name và get hang hoa theo từng mã tủ đồ
        queryset = self.queryset
        q = self.request.query_params.get('q')
        tudo_id = self.request.query_params.get('tuDo')
        if q:
            queryset = queryset.filter(name__icontains=q)
        if tudo_id:
            queryset = queryset.filter(tuDo=tudo_id)
        return queryset


class TuDoDienTuViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = TuDoDienTu.objects.filter(active=True)
    serializer_class = serializers.TuDoDienTuSerializer

    def get_permissions(self):
        if self.action in ['add_hanghoa']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='hanghoas', detail=True)
    def get_hanghoas(self, request, pk):
        hanghoas = self.get_object().hanghoa_set.filter(status='received')
        return Response(serializers.HangHoaSerializer(hanghoas, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='hanghoas', detail=True)
    def add_hanghoa(self, request, pk):
        c=self.get_object().hanghoa_set.create(name=request.data.get('name'),
                                              image=request.data.get('image'))
        return Response(serializers.HangHoaSerializer(c).data,status=status.HTTP_201_CREATED)
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
class PhieuKhaoSatViewSet(viewsets.ViewSet,generics.RetrieveAPIView):
    queryset = PhieuKhaoSat.objects.all()
    serializer_class = serializers.PhieuKhaoSatSerializer


