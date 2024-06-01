from rest_framework import  pagination

class HangHoaPaginator(pagination.PageNumberPagination):
    page_size = 6

class DichVuPaginator(pagination.PageNumberPagination):
    page_size = 6