import axios from "axios";

import Cookies from "js-cookie";

export async function getToken() {
    let accessToken = Cookies.get("access_token");
    return accessToken;
}

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}/api`,
  });
  
axiosInstance.interceptors.request.use(async (request) => {
    request.baseURL = process.env["REACT_APP_API"] + "/api";
    let token = await getToken();
    request.headers["X-Device"] = "web";
    if (token && request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    if (localStorage.getItem("project_id")) {
      request.headers["project_id"] = `${localStorage.getItem("project_id")}`
    }
    return request;
  })
  
  export default axiosInstance;