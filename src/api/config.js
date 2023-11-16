import axios from "axios";
import jwtDecode from "jwt-decode";

const client = axios.create({
  //baseURL: "http://localhost:3003/api",
  baseURL: "https://meetup-server.top/api",
});

client.interceptors.request.use((config) => {
  try {
    if (window.localStorage.getItem("token")) {
      config.headers["authorization"] = window.localStorage.getItem("token");
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

const checkForToken = () => {
  try {
    const token = window.localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    if (decodedToken.isVerified) {
      return typeof token == "string";
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const get = async (route, auth = {}, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!checkForToken()) return (window.location.pathname = "/login");
  }
  const res = await client.get(`/${route}`, auth);
  return res;
};

export const post = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!checkForToken()) return (window.location.pathname = "/login");
  }
  const res = await client.post(`/${route}`, data);
  return res;
};
export const put = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!checkForToken()) return (window.location.pathname = "/login");
  }
  const res = await client.put(`/${route}`, data);
  return res;
};
export const patch = async (route, data, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!checkForToken()) return (window.location.pathname = "/login");
  }
  const res = await client.patch(`/${route}`, data);
  return res;
};
export const _delete = async (route, shouldCheckForToken = true) => {
  if (shouldCheckForToken) {
    if (!checkForToken()) return (window.location.pathname = "/login");
  }
  const res = await client.delete(`/${route}`);
  return res;
};
