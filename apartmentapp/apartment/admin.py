from django.contrib import admin
from apartment.models import PhanAnh
# Register your models here.





class MyApartmentAdmin(admin.ModelAdmin):
    list_display = ['id','name','created_date','updated_date','active']
    search_fields = ['name']
    list_filter = ['id','created_date','name']


admin.site.register(PhanAnh,MyApartmentAdmin)
