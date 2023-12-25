import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../style/body.module.css";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");

  useEffect(() => {
    const getNameOfUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3003/users/myInfo", {
          headers: {
            "x-api-key": token,
          },
        });
        const firstLetter = data.name.charAt(0).toUpperCase();
        setUser(firstLetter);
      } catch (error) {
        console.log(error);
      }
    };
    getNameOfUser();
  }, [token]);
  return (
    <div>
      <div className={style._profile}>
        <span>{user}</span>
      </div>
    </div>
  );
};

export default Profile;
