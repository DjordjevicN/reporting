import { Link } from "react-router";

const Navigation = () => {
  return (
    <div className="p-6 flex justify-between items-center ">
      <Link to="/">
        <p className="text-xl">Reporting</p>
      </Link>
      <div className="flex gap-4">
        <Link to="/login">LOGIN</Link>
        <Link to="/">HOME</Link>
      </div>
    </div>
  );
};

export default Navigation;
