import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { userEmail } = useAuth();
  const navigate = useNavigate();
  const { isManager } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center border-b h-16 px-8">
      <NavLink to="/home" className="text-2xl font-bold">
        Spacely
      </NavLink>
      <nav className="flex gap-2">
        <NavLink to="/home">
          {({ isActive }) => (
            <Button
              variant="link"
              size="sm"
              className={isActive ? "underline hover:cursor-pointer" : "hover:cursor-pointer"}
            >
              Home
            </Button>
          )}
        </NavLink>
        <NavLink to="/my-booking">
          {({ isActive }) => (
            <Button
              variant="link"
              size="sm"
              className={isActive ? "underline hover:cursor-pointer" : "hover:cursor-pointer"}
            >
              My Booking
            </Button>
          )}
        </NavLink>
        {isManager && (
          <>
            <NavLink to="/admin/rooms">
              <Button variant="link" size="sm">
                Manage Room
              </Button>
            </NavLink>
            <NavLink to="/admin/bookings">
              <Button variant="link" size="sm">
                Manage Bookings
              </Button>
            </NavLink>
          </>
        )}
      </nav>
      <div className="flex items-center gap-4">
        {userEmail && <span className="text-sm font-medium">Hi, {userEmail}</span>}
        <Button onClick={handleLogout} variant="outline" size="sm">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
