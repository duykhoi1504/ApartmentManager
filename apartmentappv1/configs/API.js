import axios from "axios";

const BASE_URL="http://192.168.1.16:8000/"

export const endpoint ={
    'tudodientus':'/tudodientus/',
    'hanghoas':'/hanghoas/'
}

export default axios.create({
    baseURL:BASE_URL
})