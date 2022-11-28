import apiConfig from "../utils/apiConfig"
import axios from "axios"

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        "Content-type":"application/json"
    },
})

export default axiosClient