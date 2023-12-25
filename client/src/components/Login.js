import React, { useEffect } from "react";
import "../style/login.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const fetchAxios = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3003/users/login",
        user
      );
      const token = data.token;
      localStorage.setItem("token", token);
      history.push("/");
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAxios();
  };

  return (
    <div className="container">
      <header>Login Form</header>
      <div className="form-outer">
        <form onSubmit={handleSubmit}>
          <div className="page">
            <div className="title">Login Details:</div>
            <div className="field">
              <div className="label">Username Email</div>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                name="email"
                type="text"
              />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                name="password"
                type="password"
              />
            </div>
            <div className="field btns">
              <button className="submit">Submit</button>
            </div>
          </div>
        </form>
        <div>
          Dont have an acount? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
