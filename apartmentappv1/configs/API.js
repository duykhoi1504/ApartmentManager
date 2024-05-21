import axios from "axios";

// const BASE_URL="http://192.168.1.16:8000/"
const BASE_URL="http://10.0.1.121:8000/"


export const endpoints ={
    'tudodientus':'/tudodientus/',
    'hanghoas':'/hanghoas/',
    'hanghoa-details': (hanghoaId) => `/hanghoas/${hanghoaId}/`
}

export default axios.create({
    baseURL:BASE_URL
})