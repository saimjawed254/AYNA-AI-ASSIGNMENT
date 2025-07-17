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
        <>
            <div className="home-container">
                <div className="login-container">
                    <form onSubmit={handleSubmit} className="login-box">
                        <div className="login-top">
                            <div className="login-text">Sign in to <span className="login-heading">Ayna</span> </div>
                            <div className="login-text-warning">Welcome! Please enter your login details if you already have an account</div>
                        </div>

                        <input className="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        <input className="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        {err && <p className="error">{err}</p>}
                        <button className="login-button" type="submit">Login</button>
                        <div className="login-register">
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                margin: "20px 0"
                            }}>
                                <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                                <span style={{ padding: "0 10px", color: "#999", fontWeight: "500" }}>OR</span>
                                <div style={{ flex: 1, height: "1px", backgroundColor: "#ccc" }}></div>
                            </div>
                            
                            <p>Don't have an account? <a href="/register">Register</a></p>
                        </div>
                    </form>
                </div>
                <div className="grid-container">
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box">
                        <div className="grid-box-heading">3X</div>
                        <div className="grid-box-text">Build dynamic forms 3× faster — with real-time previews, structured responses, and instant share links.</div>
                    </div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="grid-box-heading">Create. Preview. Share.</div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                    <div className="grid-box"><div className="black-overlay"></div></div>
                </div>
            </div>
        </>

    );
}
