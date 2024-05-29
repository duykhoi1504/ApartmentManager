// Reducer là một hàm xác định các thay đổi đối với trạng thái của ứng dụng.
// Nó sử dụng hành động nhận được để quyết định cách cập nhật trạng thái.


//Reducer này nhận trạng thái hiện tại và một hành động làm tham số.
export const MyUserReducer = (current, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
    return current;
}

export default MyUserReducer