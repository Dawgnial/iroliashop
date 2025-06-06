import axios from "axios";
import BASE_URL from "../constants/baseUrl";

const api = axios.create({
  baseURL: BASE_URL + "/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;