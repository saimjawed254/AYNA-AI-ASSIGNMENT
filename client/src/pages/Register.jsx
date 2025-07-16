import { useState } from "react";
import api from "../utils/api";
import "../styles/register.mobile.css";
import "../styles/register.desktop.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { email, password });
            const res = await api.post("/auth/login", { email, password });
            login(res.data.token);
            window.location.href = "/dashboard";
            setErr("");
        } catch (error) {
            setErr(error.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-box">
                <h2>Register</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                {msg && <p className="success">{msg}</p>}
                {err && <p className="error">{err}</p>}
                <button type="submit">Register</button>
                <p>Already have an account? <a href="/">Login</a></p>
            </form>
        </div>
    );
}
