import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "https://transatlantic.test/api/";
axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
  "access_token"
)}`;

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
    const { status, statusText } = error.response;
    if (status === 401 && statusText === "Unauthorized") console.log("error");
  }
);
