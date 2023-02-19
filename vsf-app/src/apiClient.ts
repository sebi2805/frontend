import axios, { AxiosInstance } from "axios";

export const getAccesToken = () => {
  return localStorage.getItem("clientJWT");
};

export const authorise = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAccesToken()}`,
      accept: "text/plain",
    },
  };
};

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const apiClient = axios.create({
  baseURL: BASE_URL,
});
const errorInterceptor = (val: AxiosInstance) => {
  val.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("accesToken");
        localStorage.setItem("USER", "USER_NOT_FOUND");
        window.location.reload();
      } else {
        return Promise.reject(err);
      }
    }
  );
};
errorInterceptor(apiClient);
