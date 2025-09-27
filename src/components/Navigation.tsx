import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import PermissionModal from "./PermissionModal";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import type { IStoreLocation } from "../types";
import { codeToText } from "../helpers/codeToText";

const Navigation = () => {
  const storeLocation = localStorage.getItem("shift") as IStoreLocation;
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth");
  const isAdmin = localStorage.getItem("shift") === "admin";
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("shift");
    navigate("/login");
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="p-6 flex justify-between items-center ">
      <Link className="flex items-center gap-2" to="/">
        <FaHome />
        <p className="text-xl">
          Reporting{" "}
          <span className="text-muted-foreground text-xl ml-3">
            {codeToText(storeLocation)}
          </span>
        </p>
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
