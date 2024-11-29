import axios from "axios";
const apiUrl = import.meta.env.VITE_SERVER_URL;


const axiosInstance  = axios.create({
    baseURL: `${apiUrl}/api/v1`,
    headers: {
        "Content-Type": "application/json"
    },

});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default axiosInstance;