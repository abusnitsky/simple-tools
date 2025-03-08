import axios from "axios";
import config from "../config.js";

const API = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Allows cookies (refresh token)
});

// Attach Access Token Automatically
API.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Expired Access Token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        const res = await axios.post(config.API_REFRESH_URL, {}, { withCredentials: true });
        localStorage.setItem("accessToken", res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config); // Retry failed request
      } catch (refreshError) {
        console.error("Refresh token expired");
        localStorage.removeItem("accessToken");
      }
    }
    return Promise.reject(error);
  }
);

export default API;
