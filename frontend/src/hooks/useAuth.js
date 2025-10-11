import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  let userEmail = "";
  let isManager = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userEmail = decodedToken.sub;
      if (decodedToken.authorities && decodedToken.authorities.includes("ROLE_MANAGER")) {
        isManager = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }

  return { token, userEmail, isManager };
};
