import React from "react";
import styles from "../styles/todayCard.module.css";

const TodayCard = ({ title, children }) => {
  return (
    <article className={styles.container}>
      <div className={styles.content}>
        <h4>{title}</h4>
        {children}
      </div>
    </article>
  );
};

export default TodayCard;
