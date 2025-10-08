import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
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
      </nav>
      <NavLink to="/profile">
        <FaRegUserCircle className="text-2xl" />
      </NavLink>
    </header>
  );
};

export default Header;
