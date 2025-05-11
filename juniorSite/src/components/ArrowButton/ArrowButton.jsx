// components/ArrowButton.jsx
import React from "react";

const ArrowButton = ({ onClick, disabled, icon: Icon, className }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      <Icon />
    </button>
  );
};

export default ArrowButton;
