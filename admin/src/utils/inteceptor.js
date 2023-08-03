import axios from "axios";
import { baseURL } from "../config/config";

var instance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    console.log("config", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
