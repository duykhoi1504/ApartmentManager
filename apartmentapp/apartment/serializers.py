from rest_framework import serializers
from apartment.models import PhanAnh


class PhanAnhSerializer(serializers.ModelSerializer):
    class Meta:
        model=PhanAnh
        fields='__all__'