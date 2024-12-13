import { Http } from "@capacitor-community/http";
import { config } from "src/boot/http";
import { useRouter } from "vue-router";

class ApiClient {
  constructor() {
    this.baseURL = config.API_BASE_URL;
  }

  get router() {
    return useRouter();
  }

  async request(method, url, data = {}, conf = {}) {
    const fullUrl = `${this.baseURL}${url}`;

    const params = conf.params || {};
    const requestData =
      method === "POST" || method === "PUT" || method === "PATCH"
        ? data || {}
        : undefined;

    const options = {
      url: fullUrl,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
        ...conf.headers,
      },
      params: params,
      data: requestData,
    };

    await this.attachTokenToRequest(options);

    try {
      const response = await Http.request({ ...options, method });
      return Promise.resolve(response);
    } catch (error) {
      console.error("HTTP Request Error: ", error);
      return Promise.reject(error);
    }
  }

  // GET request
  async get(url, conf = {}) {
    return this.request("GET", url, {}, conf);
  }

  // POST request
  async post(url, data = {}, conf = {}) {
    return this.request("POST", url, data, conf);
  }

  // PUT request
  async put(url, data = {}, conf = {}) {
    return this.request("PUT", url, data, conf);
  }

  // PATCH request
  async patch(url, data = {}, conf = {}) {
    return this.request("PATCH", url, data, conf);
  }

  // DELETE request
  async delete(url, conf = {}) {
    return this.request("DELETE", url, {}, conf);
  }

  // Handle cookies
  async setCookie(url, key, value) {
    const options = {
      url: url,
      key: key,
      value: value,
    };
    await Http.setCookie(options);
  }

  async deleteCookie(url, key) {
    const options = {
      url: url,
      key: key,
    };
    await Http.deleteCookie(options);
  }

  async clearCookies(url) {
    await Http.clearCookies({ url });
  }

  // Handle authentication (for example, token refresh)
  async handleAuthError(error, originalRequest) {
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      originalRequest.isRefreshing = true;
      try {
        // Refresh token request
        const refreshResponse = await this.post("/auth/account/token/refresh");
        localStorage.setItem("tokenDataAuth", refreshResponse.data.token);
        localStorage.setItem("userIsLoggedIn", "true");
        localStorage.setItem(
          "userData",
          JSON.stringify(refreshResponse.data.data)
        );

        // Retry original request with updated token
        originalRequest.headers["Authorization"] = ` ${localStorage.getItem(
          "tokenDataAuth"
        )}`;
        originalRequest.isRefreshing = false;
        return Http.request(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        localStorage.clear();
        this.router.push({ path: "/auth/login" });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
  async attachTokenToRequest(config) {
    const token = localStorage.getItem("tokenDataAuth");
    if (token) {
      config.headers["Authorization"] = ` ${token}`;
    }
    return config;
  }

  async getInstance() {}
}

export const apiClient = new ApiClient();
