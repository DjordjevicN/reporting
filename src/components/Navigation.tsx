import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import PermissionModal from "./PermissionModal";

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth");
  const isAdmin = localStorage.getItem("shift") === "admin";
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("shift");
    navigate("/login");
  };
  return (
    <div className="p-6 flex justify-between items-center ">
      <Link to="/">
        <p className="text-xl">Reporting</p>
      </Link>

      <div className="flex gap-4 items-center">
        {isAdmin && (
          <Link to="/admin-controls">
            <Button>Admin</Button>
          </Link>
        )}
        {!isAuth && <Link to="/login">LOGIN</Link>}
        {isAuth && (
          <PermissionModal
            confirm={handleLogout}
            title="Da li si siguran da želiš da se izloguješ?"
            label="Izloguj se sa platforme"
          >
            Logout
          </PermissionModal>
        )}
      </div>
    </div>
  );
};

export default Navigation;
