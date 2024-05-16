from django.contrib import admin
from django.urls import path,re_path,include
from rest_framework import routers
from apartment import views


r=routers.DefaultRouter()
r.register('hoadons',views.HoaDonViewSet,basename='hoadons')
r.register('tudodientus',views.TuDoDienTuViewSet,basename='tudodientus')
r.register('phieukhaosats',views.PhieuKhaoSatViewSet,basename='phieukhaosats')
r.register('phananhs',views.PhanAnhViewSet,basename='phananhs')
r.register('hanghoas',views.HangHoaViewSet,basename='hanghoas')
r.register('users',views.UserViewSet,basename='users')
r.register('nguoithans',views.NguoiThanViewSet,basename='nguoithans')
r.register('dapankhaosats',views.DapAnKhaoSatViewSet,basename='dapankhaosats')

urlpatterns = [
    path('',include(r.urls))
]
