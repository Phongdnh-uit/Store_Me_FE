import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/constants/appConstant";
import axios from "axios";
import { refreshAccessToken } from "./authService";
import type { LoginResponseType } from "@/types/auth";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
      if (refreshToken) {
        try {
          const data = await refreshAccessToken({ refreshToken });
          if (data?.data) {
            const { accessToken, refreshToken: newRefreshToken } =
              data.data as LoginResponseType;
            localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
            localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, newRefreshToken);

            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch {
          localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
          localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
      }
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
