import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5173/api/v1";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export default axiosInstance;
