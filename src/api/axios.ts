import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_UBIWHERE_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Handle 401 Unauthorized responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/token");

    // If we receive a 401 response and it's not from the login request, redirect to login
    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;