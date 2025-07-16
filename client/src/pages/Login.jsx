import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import "../styles/login.mobile.css";
import "../styles/login.desktop.css";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {err && <p className="error">{err}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}
