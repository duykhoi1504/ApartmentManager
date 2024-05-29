import axios from "axios";
// const BASE_URL="http://192.168.1.15:8000/"
// const BASE_URL="http://10.0.1.138:8000/"
// GiangNam
const BASE_URL="http://10.20.1.228:8000/"

export const endpoints ={
    'tudodientus':'/tudodientus/',
    'hanghoas':'/hanghoas/',
    'hanghoa-details': (hanghoaId) => `/hanghoas/${hanghoaId}/`,
    'phananhs':'/phananhs/',
    'register':'/users/',
    'login':'/o/token/',
    'current-user':'/users/current-user/',
    'users':'/users/',
    'getUser':(userId) => `/users/${userId}/`,
}


export default axios.create({
    baseURL:BASE_URL
})