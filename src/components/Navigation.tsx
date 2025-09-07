import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth");
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
        {!isAuth && <Link to="/login">LOGIN</Link>}
        {isAuth && (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
