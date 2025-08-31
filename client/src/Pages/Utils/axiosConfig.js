import axios from "axios";
import Cookie from "js-cookie"


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(
    (config) => {
        const token = Cookie.get("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api