import axios from "axios"
const BASE_URL="http://192.168.1.15:8000/"
// const BASE_URL="http://10.0.0.93:8000/"
// GiangNam
// const BASE_URL="http://10.10.1.73:8000/"
// const BASE_URL="http://10.10.1.73:8000/"
// const BASE_URL="http://172.20.10.11:8000/"
export const endpoints ={
    'tudodientus':'/tudodientus/',
    'hanghoas':'/hanghoas/',
    'hanghoa-details': (hanghoaId) => `/hanghoas/${hanghoaId}/`,
    'phananhs':'/phananhs/',
    'vietphananh':'/phananhs/',
    'register':'/users/',
    'login':'/o/token/',
    'current-user':'/users/current-user/',
    'users':'/users/',
    'getUser':(userId) => `/users/${userId}/`,
    'nguoithans': '/nguoithans/',
    'dichvus': '/dichvus/',
    'hoadons': '/hoadons/',
    'themhoadon': '/hoadons/',
    'hoadon-details': (hoadonId) => `/hoadons/${hoadonId}/`,
    'hoadon-upuynhiemchi': (hoadonId) => `/hoadons/${hoadonId}/upuynhiemchi/`
}

export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
export default axios.create({
    baseURL:BASE_URL
})