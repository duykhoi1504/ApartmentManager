from django.contrib import admin
from django.urls import path,re_path,include
from rest_framework import routers
from apartment import views


r=routers.DefaultRouter()
r.register('phananhs',views.PhanAnhViewSet,basename='phananhs')
urlpatterns = [
    path('',include(r.urls))
]
