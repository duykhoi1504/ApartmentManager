from django.shortcuts import render
from rest_framework import viewsets,generics
from apartment import  serializers
from apartment.models import PhanAnh
# Create your views here.
class PhanAnhViewSet(viewsets.ViewSet,generics.ListAPIView):
    queryset = PhanAnh.objects.filter(active=True)
    serializer_class = serializers.PhanAnhSerializer