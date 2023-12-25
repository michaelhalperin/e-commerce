import React, { useState } from "react";
import "../style/login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const fetchAxios = async () => {
    const data = await axios
      .post("http://localhost:3003/users", user)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    history.push("/login");
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAxios();
  };

  return (
    <div className="container">
      <header>Signup Form</header>
      <div className="form-outer">
        <form onSubmit={handleSubmit}>
          <div className="page">
            <div className="title">Signup Details:</div>
            <div className="field">
              <div className="label">Username</div>
              <input
                name="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                type="text"
              />
            </div>
            <div className="field">
              <div className="label">Email</div>
              <input
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
              />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input
                name="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
              />
            </div>
            <div className="field btns">
              <button className="submit">Submit</button>
            </div>
          </div>
        </form>
        <div>
          Already have an acount? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
