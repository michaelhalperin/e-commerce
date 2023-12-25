import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Profile from "./Profile";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history = useHistory();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Super Shop</h1>
        <div className="links" style={{ display: "flex" }}>
          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
          {token && (
            <div style={{ display: "flex" }}>
              <Link to="/">Home</Link>
              <Link to="/list">Shopping List</Link>
              <Link to="/login" onClick={handleLogout}>
                Logout
              </Link>
              <Profile />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
