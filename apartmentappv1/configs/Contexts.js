import { createContext } from "react";
//MyUserContext: Context này sẽ giữ trạng thái người dùng hiện tại.
export const MyUserContext = createContext();

//MyDispatchContext: Context này sẽ giữ hàm dispatch có thể được sử dụng để cập nhật trạng thái người dùng.
export const MyDispatchContext = createContext();

