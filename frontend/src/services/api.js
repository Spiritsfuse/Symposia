import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 180000,
});

export function getApiError(error) {
  if (error.response?.data?.detail) {
    return Array.isArray(error.response.data.detail)
      ? error.response.data.detail.map((item) => item.msg).join(", ")
      : error.response.data.detail;
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === "ECONNABORTED") {
    return "The request timed out. The backend may still be processing the paper.";
  }

  if (error.request) {
    return "Unable to reach the backend. Confirm the API server is running.";
  }

  return error.message || "Something went wrong.";
}
