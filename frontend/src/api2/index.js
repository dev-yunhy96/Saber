import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "https://www.mecallapi.com/api/users";

const createInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { createInstance };
