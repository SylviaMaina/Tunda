import axios from "axios";
import { useRouter } from "vue-router";
import authToken from "./AuthSession.js"; // Ensure this works with Quasar/Vue setup

class ApiClient {
  constructor() {
    this.client = this.getInstance();
    this.router = useRouter(); // Use Vue Router for navigation
  }

  getClient() {
    return this.client;
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  getInstance() {
    const client = axios.create({
      baseURL: "http://212.47.72.98:3001/api/v1",
    });

    // Request interceptor
    client.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("tokenDataAuth");
        if (token) {
          // Set Authorization header directly with the token only, no "Bearer " prefix
          config.headers["Authorization"] = token;
        }
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.config &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.isRefreshing
        ) {
          originalRequest._retry = true;
          originalRequest.isRefreshing = true;
          try {
            const response = await client.post("auth/account/token/refresh");
            localStorage.setItem("tokenDataAuth", response.data.token);
            localStorage.setItem("userIsLoggedIn", "true");
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );

            // Update the request header and retry
            originalRequest.headers["Authorization"] = ` ${localStorage.getItem(
              "tokenDataAuth"
            )}`;
            originalRequest.isRefreshing = false;
            return client.request(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            localStorage.clear();
            this.router.push({ path: "/auth/login" });
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return client;
  }
}

export let apiClient = new ApiClient();
