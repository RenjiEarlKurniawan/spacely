import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  let userEmail = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userEmail = decodedToken.sub;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  return { token, userEmail };
};
