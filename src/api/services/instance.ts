import axios, { AxiosRequestConfig, AxiosError } from "axios";
import ENV from "../../../env.json"; // Adjust the path as necessary

type AvailableEnvs = "dev" | "prod" | "test";
const Environment: AvailableEnvs =
  (process.env.NODE_ENV as AvailableEnvs) || "test";

let TOKEN: string | null = null;

export async function setToken(val: string | null) {
  TOKEN = val;
}

const DEFAULT_TIMEOUT = 60000;

const Config: AxiosRequestConfig = {
  baseURL: ENV[Environment],
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Authorization: null,
    "ngrok-skip-browser-warning": true,
  },
};

// Create an Axios instance with default configuration
const axiosInstance = axios.create(Config);

// Request interceptor for adding token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
