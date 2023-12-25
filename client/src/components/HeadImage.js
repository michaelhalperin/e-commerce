import React from "react";
import display from "../Images/apple_shop.png";
import style from "../style/body.module.css";

const HeadImage = () => {
  return (
    <div className={style.head_img}>
      <img src={display} alt="display" />
    </div>
  );
};

export default HeadImage;
