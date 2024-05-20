import axios from "axios";

const BASE_URL="http://10.0.1.121:8000/"

export const endpoint ={
    'tudodientus':'/tudodientus/',
    'hanghoas':'/hanghoas/'
}

export default axios.create({
    baseURL:BASE_URL
})