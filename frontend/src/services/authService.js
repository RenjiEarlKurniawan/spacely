import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig.js";

export const loginUser = async (email, password) => {
  const response = await axios.post(API_ENDPOINTS.LOGIN, {
    email: email,
    password: password,
  });
  return response.data;
};
