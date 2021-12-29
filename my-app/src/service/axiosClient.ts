import axios from "axios";
import StorageKeys from "./contants";

const axiosClient = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a response interceptor
axiosClient.interceptors.request.use(
    function (config: any) {
        if (localStorage.getItem(StorageKeys.TOKEN)) {
            let token = localStorage.getItem(StorageKeys.TOKEN);
            config.headers.common["Authorization"] = `Bearer ${token}`;
            return config;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error) {
            const {
                data: { errors },
            } = error.response;
            for (let key in errors) {
                throw new Error(`${key} ${errors[key]}`);
            }
        }

        return Promise.reject(error);
    }
);
export default axiosClient;
