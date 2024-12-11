import axios from "axios";
import { getToken } from "./token";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || `http://192.168.43.246:3000/api`,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
