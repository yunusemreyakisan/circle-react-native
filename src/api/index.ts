import axios, { AxiosRequestConfig, AxiosError } from "axios";
import ENV from "../../env.json";

type Packet =
  | unknown[]
  | string
  | number
  | boolean
  | Record<string, unknown>
  | FormData;

type Response<T> = {
  statusCode: string | null;
  data: T | null;
};

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

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

async function GET<T>(
  url: string,
  params?: Record<string, unknown>
): Promise<Response<T>> {
  try {
    const controller = new AbortController();
    const config: AxiosRequestConfig = {
      ...Config,
      signal: controller.signal,
      params: params,
    };
    if (TOKEN) {
      config.headers!.Authorization = `Bearer ${TOKEN}`;
    }
    const mainUrl = ENV[Environment] + url;
    const response = await axios.get<T>(mainUrl, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: error.response?.status.toString() || "500",
        data: null,
      };
    } else {
      return {
        statusCode: "500",
        data: null,
      };
    }
  }
}

async function POST<T>(
  url: string,
  data: Packet | FormData,
  isFormData?: boolean
): Promise<Response<T>> {
  try {
    const controller = new AbortController();
    const config: AxiosRequestConfig = {
      ...Config,
      signal: controller.signal,
    };
    if (TOKEN) {
      config.headers!.Authorization = `Bearer ${TOKEN}`;
    }
    config.headers!["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";
    const mainUrl = ENV[Environment] + url;
    const response = await axios.post<T>(mainUrl, data, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: error.response?.status.toString() || "500",
        data: null,
      };
    } else {
      return {
        statusCode: "500",
        data: null,
      };
    }
  }
}

async function PUT<T>(
  url: string,
  data: Packet | FormData,
  isFormData?: boolean
): Promise<Response<T>> {
  try {
    const controller = new AbortController();
    const config: AxiosRequestConfig = {
      ...Config,
      signal: controller.signal,
    };
    if (TOKEN) {
      config.headers!.Authorization = `Bearer ${TOKEN}`;
    }
    config.headers!["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";
    const mainUrl = ENV[Environment] + url;
    const response = await axios.put<T>(mainUrl, data, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: error.response?.status.toString() || "500",
        data: null,
      };
    } else {
      return {
        statusCode: "500",
        data: null,
      };
    }
  }
}

async function PATCH<T>(
  url: string,
  data: Packet | FormData,
  isFormData?: boolean
): Promise<Response<T>> {
  try {
    const controller = new AbortController();
    const config: AxiosRequestConfig = {
      ...Config,
      signal: controller.signal,
    };
    if (TOKEN) {
      config.headers!.Authorization = `Bearer ${TOKEN}`;
    }
    config.headers!["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";
    const mainUrl = ENV[Environment] + url;
    const response = await axios.patch<T>(mainUrl, data, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: error.response?.status.toString() || "500",
        data: null,
      };
    } else {
      return {
        statusCode: "500",
        data: null,
      };
    }
  }
}

async function DELETE<T>(url: string): Promise<Response<T>> {
  try {
    const controller = new AbortController();
    const config: AxiosRequestConfig = {
      ...Config,
      signal: controller.signal,
    };
    if (TOKEN) {
      config.headers!.Authorization = `Bearer ${TOKEN}`;
    }
    const mainUrl = ENV[Environment] + url;
    const response = await axios.delete<T>(mainUrl, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        statusCode: error.response?.status.toString() || "500",
        data: null,
      };
    } else {
      return {
        statusCode: "500",
        data: null,
      };
    }
  }
}

export default { GET, POST, PUT, PATCH, DELETE };
