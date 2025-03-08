import API from "./utils/api";

const config = {
  API_URL: import.meta.env.VITE_API_URL,
  API_LOGIN_URL: import.meta.env.VITE_API_LOGIN_URL,
  API_REFRESH_URL: import.meta.env.VITE_API_REFRESH_URL,
  API_LOGOUT_URL: import.meta.env.VITE_API_LOGOUT_URL,
  API_WEATHER_URL: import.meta.env.VITE_API_WEATHER_URL,
  TODO_API_URL: import.meta.env.VITE_TODO_API_URL,
  HOLIDAYS_API_URL: import.meta.env.VITE_HOLIDAYS_API_URL,
  EVENTS_API_URL: import.meta.env.VITE_EVENTS_API_URL,
  WEATHER_API_URL: import.meta.env.VITE_WEATHER_API_URL,
  CURRENT_WEATHER_API_URL: import.meta.env.VITE_CURRENT_WEATHER_API_URL,
};

export default config;