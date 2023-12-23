import React from "react";
import css from "./Style/FloatingTitle.module.css";

const FloatingTitle = ({ title }) => {
  return (
    <div className={css.container}>
      <h1 className={css.floatingTitle}>{title}</h1>
    </div>
  );
}

export default FloatingTitle;
