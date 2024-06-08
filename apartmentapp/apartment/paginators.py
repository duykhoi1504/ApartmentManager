from rest_framework import  pagination

class HangHoaPaginator(pagination.PageNumberPagination):
    page_size = 6

class DichVuPaginator(pagination.PageNumberPagination):
    page_size = 6

class PhanAnhPaginator(pagination.PageNumberPagination):
    page_size =6

class HoaDonPaginator(pagination.PageNumberPagination):
    page_size = 10
