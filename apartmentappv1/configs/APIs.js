import axios from "axios"
import {API_HOST} from "@env"
// API
const BASE_URL=API_HOST
// const BASE_URL="https://pokesora90.pythonanywhere.com/"

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
    'hoadon-upuynhiemchi': (hoadonId) => `/hoadons/${hoadonId}/upuynhiemchi/`,
    'phieukhaosats': '/phieukhaosats/',
    'cauhoikhaosats': (phieukhaosatId) => `/phieukhaosats/${phieukhaosatId}/`,
    'dapankhaosats': (phieukhaosatId, cauhoikhaosatId) => `/phieukhaosats/${phieukhaosatId}/dapans/${cauhoikhaosatId}/`,
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