import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/home" /> : <Outlet />;
};

export default GuestRoute;
