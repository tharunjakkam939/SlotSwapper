import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, clearToken } from "../utils/auth";

export default function Navbar() {
  const token = getToken();
  const navigate = useNavigate();

  function onLogout() {
    clearToken();
    navigate("/login");
  }

  return (
    <header className="nav">
      <div className="brand">SlotSwapper</div>
      <nav className="navlinks">
        {token ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/requests">Requests</Link>
            <button className="btn-link" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
