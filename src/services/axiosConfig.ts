import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "@/constants/appConstant";
import axios from "axios";
import { refreshAccessToken } from "./authService";
import type { LoginResponseType } from "@/types/auth";
import { useNavigate } from "@tanstack/react-router";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5173/api/v1";

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
  (error) => {
    const navigate = useNavigate();
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
      if (refreshToken) {
        const refreshResponse = refreshAccessToken({ refreshToken });
        refreshResponse
          .then((data) => {
            if (data && data.data) {
              const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              } = data.data as LoginResponseType;
              localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);
              localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, newRefreshToken);
              return axiosInstance(originalRequest);
            }
          })
          .catch(() => {
            localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
            localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
            navigate({ to: "/auth/login" });
          });
      }
    }
  },
);

export default axiosInstance;
