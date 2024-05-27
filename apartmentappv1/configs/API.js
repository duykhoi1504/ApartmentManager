import axios from "axios";
// const BASE_URL="http://192.168.1.16:8000/"
const BASE_URL="http://10.0.1.138:8000/"


export const endpoints ={
    'tudodientus':'/tudodientus/',
    'hanghoas':'/hanghoas/',
    'hanghoa-details': (hanghoaId) => `/hanghoas/${hanghoaId}/`,
    'phananhs':'/phananhs/',
    'users':'/users/',
    'getUser':(userId) => `/users/${userId}/`,
}


export default axios.create({
    baseURL:BASE_URL
})