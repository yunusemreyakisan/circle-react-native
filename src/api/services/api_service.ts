import axios, { AxiosError } from "axios";
import axiosInstance from "./instance";
import { ApiResponse, Packet } from "./api";

// Utility function to handle errors
function handleError<T>(error: any): ApiResponse<T> {
  if (axios.isAxiosError(error)) {
    return {
      statusCode: error.response?.status.toString() || "500",
      data: null,
    };
  }
  return {
    statusCode: "500",
    data: null,
  };
}

export async function GET<T>(
  url: string,
  params?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.get<T>(url, { params });
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    return handleError<T>(error);
  }
}

export async function POST<T>(
  url: string,
  data: Packet | FormData,
  isFormData = false
): Promise<ApiResponse<T>> {
  try {
    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const response = await axiosInstance.post<T>(url, data, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    return handleError<T>(error);
  }
}

export async function PUT<T>(
  url: string,
  data: Packet | FormData,
  isFormData = false
): Promise<ApiResponse<T>> {
  try {
    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const response = await axiosInstance.put<T>(url, data, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    return handleError<T>(error);
  }
}

export async function PATCH<T>(
  url: string,
  data: Packet | FormData,
  isFormData = false
): Promise<ApiResponse<T>> {
  try {
    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};
    const response = await axiosInstance.patch<T>(url, data, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    return handleError<T>(error);
  }
}

export async function DELETE<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await axiosInstance.delete<T>(url);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    return handleError<T>(error);
  }
}
