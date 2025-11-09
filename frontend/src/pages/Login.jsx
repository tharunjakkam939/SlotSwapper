import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../utils/api";
import { saveToken } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const data = await apiPost("/auth/login", { email, password });
      // backend returns { token } or {token:..., user:...}
      saveToken(data.token ?? data.accessToken ?? data);
      nav("/");
    } catch (e) {
      setErr("Login failed: " + e.message);
    }
  }

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn">Login</button>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
}
