from rest_framework import  pagination

class HangHoaPaginator(pagination.PageNumberPagination):
    page_size = 5