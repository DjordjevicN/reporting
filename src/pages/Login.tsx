import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleLogin}
        className=" p-8 rounded shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Password</label>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
