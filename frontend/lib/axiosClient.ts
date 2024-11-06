import axios from "axios";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: fix some issues
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (error.response) {
      if (error.response.status === 400) {
        error.message = "Bad request: 400";
      } else if (
        error.response.status === 403 ||
        error.response.status === 401
      ) {
        error.message = "Not authorized: 401, 403";
      } else if (error.response.status === 500) {
        error.message = "Server error: 500";
      }
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    return Promise.reject(error);
  },
);
