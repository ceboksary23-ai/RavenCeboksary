import React from "react";
import styles from "../../../styles/components/common/RegButton/RegButton.module.css";

const RegButton = (props) => {
  const {
    children,
    color = "blue",
    size = "medium",
    onClick,
    disabled = false,
  } = props;

  return (
    <button
      className={`${styles.btn} ${styles[`btn-${color}`]} ${
        styles[`btn-${size}`]
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default RegButton;
