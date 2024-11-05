import { throws } from "assert";
import axios from "axios";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// FIX: this should be better
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error("Wrong request: verify your data");
      } else if (error.response.status === 403) {
        throw new Error("Not authorized: verify your credentials");
      } else if (error.response.status === 500) {
        throw new Error("Server Error: try later.");
      }
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    return Promise.reject(error);
  },
);
