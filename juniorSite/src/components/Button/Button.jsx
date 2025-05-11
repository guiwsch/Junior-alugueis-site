import React from "react";
import st from "./Button.module.css";

const MainButton = ({ label, variant = "primary" }) => {
  const buttonClass =
    variant === "secondary"
      ? `${st.MainButton} ${st.secondary}`
      : `${st.MainButton} ${st.primary}`;

  return <button className={buttonClass}>{label}</button>;
};

export default MainButton;
