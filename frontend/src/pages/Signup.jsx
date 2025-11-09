import React, { useState } from "react";
import { apiPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await apiPost("/auth/register", { name, email, password });
      nav("/login");
    } catch (e) {
      setErr("Signup failed: " + e.message);
    }
  }

  return (
    <div className="auth-box">
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn">Create account</button>
        {err && <div className="error">{err}</div>}
      </form>
    </div>
  );
}
