import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token)
    config.headers.Authorization = `Bearer ${token}`;

  return config;
},
  (error) => Promise.reject(error)
);

api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    // If access token expired (401 or 403)
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken = localStorage.getItem("refreshToken");

        const res = await axios.post(
          "http://localhost:8080/refresh",
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        // Update header
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {

        // Refresh failed → logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
