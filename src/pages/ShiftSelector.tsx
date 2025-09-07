import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

const ShiftSelector = () => {
  const admin = import.meta.env.VITE_USER_ADMIN;
  const NBG = import.meta.env.VITE_USER_NBG;
  const VCR = import.meta.env.VITE_USER_VCR;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(password);
    if (password === admin) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("shift", "admin");
      navigate("/");
    }
    if (password === NBG) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("shift", "nbg");
      navigate("/");
    }
    if (password === VCR) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("shift", "vcr");
      navigate("/");
    }
    setPassword("");
  };
  return (
    <div className="flex justify-center items-center h-screen gap-10">
      <div>
        <p className="text-3xl mb-2">Mama Goca Reporting</p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Unesi sifru lokala"
        />
        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Nastavi
        </Button>
      </div>
    </div>
  );
};

export default ShiftSelector;
