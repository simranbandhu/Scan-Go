import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.109.131:3000/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can add headers or other configurations here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("API call error: ", error);
    return Promise.reject(error);
  }
);

export default instance;
