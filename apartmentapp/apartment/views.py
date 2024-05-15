from django.shortcuts import render
from rest_framework import viewsets, generics, status,parsers
from apartment import serializers, paginators
from apartment.models import PhanAnh, HangHoa, HoaDon,DichVu, TuDoDienTu, PhieuKhaoSat, DapAnKhaoSat, CauHoiKhaoSat,User
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
class UserViewSet(viewsets.ViewSet,generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer

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
        hoadon = self.get_object()
        dichvus = DichVu.objects.filter(hoadon=hoadon, active=True)
        return Response(serializers.DichVuSerializer(dichvus, many=True).data, status=status.HTTP_200_OK)

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

    @action(methods=['get'], url_path='hanghoas', detail=True)
    def get_hanghoas(self, request, pk):
        hanghoas = self.get_object().hanghoa_set.filter(status='received')
        return Response(serializers.HangHoaSerializer(hanghoas, many=True).data, status=status.HTTP_200_OK)


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


