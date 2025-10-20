
import { logDOM } from "@testing-library/dom";
import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_URL || "https://backend.hunarmandpunjab.pk";
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const invoke = async ({ url, method = "GET", data = null, headers = {} }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const requestHeaders = {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({
      method,
      url: `${BASE_URL}/api${url}`,
      data,
      headers: requestHeaders,
    });

    return response;
  } catch (error) {
    // Handle token expiration
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    throw error;
  }
};

export default invoke;

