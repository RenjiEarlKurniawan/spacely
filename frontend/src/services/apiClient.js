import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      console.log("token tidak valid atau sudah kedaluwarsa");
      console.log("logoout");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
