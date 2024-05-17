from rest_framework import  permissions

#kiem tra quyền không có sẵn
class HoaDonOwner(permissions.IsAuthenticated):
    #has_object_permission. Phương thức này được gọi để kiểm tra xem người dùng có quyền truy cập vào đối tượng tudo hay không.
    # Điều này để đảm bảo rằng người dùng đã xác thực (đã đăng nhập) mới có thể có quyền truy cập vào đối tượng.
    def has_object_permission(self, request, view, hoadon):
        # Trong phương thức has_object_permission, chúng ta gọi phương thức has_permission của lớp cha (permissions.IsAuthenticated)
        # bằng cách sử dụng super().has_permission(request, view).
        # Điều này để đảm bảo rằng người dùng đã xác thực (đã đăng nhập) mới có thể có quyền truy cập vào đối tượng.
        ####
        #Sau đó, chúng ta kiểm tra xem request.user (người dùng hiện tại) có trùng với tudo.u (chủ sở hữu của đối tượng tudo) hay không.
        # Nếu hai giá trị này bằng nhau, tức là người dùng là chủ sở hữu của đối tượng, chúng ta trả về True,
        # cho phép quyền truy cập. Nếu không, chúng ta trả về False, không cho phép quyền truy cập.
        return super().has_permission(request,view) and request.user== hoadon.user or request.user.is_superuser




#Tổng kết lại, lớp TuDoOwner xác định quyền truy cập của người dùng vào một đối tượng cụ thể bằng cách kế thừa từ permissions.IsAuthenticated
# và ghi đè phương thức has_object_permission để kiểm tra xem người dùng có là chủ sở hữu của đối tượng hay không.

class AdminOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return False

# class HoaDonOwner(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if request.user.is_authenticated:
#             return True
#         return False
#
#     def has_object_permission(self, request, view, hoadon):
#         if request.user.is_superuser or request.user == hoadon.user:
#             return True
#         return False