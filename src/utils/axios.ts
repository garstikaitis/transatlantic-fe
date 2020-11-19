import router from "@/router";
import store from "@/store";
import axios from "axios";

axios.defaults.baseURL = "https://transatlantic.test/api/";
const token = store.state.auth?.token;
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { status, data } = error.response;
    if (status === 429) return;
    if (status === 401) {
      store.dispatch("auth/logout");
    }
  }
);
