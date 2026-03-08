import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});