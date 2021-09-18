import React from "react";
import styles from "../styles/modalContent.module.css";

const ModalContent = ({ sheet, index }) => {
  const { timestamp, details, health } = sheet;
  return (
    <div className={styles.content}>
      <p>
        <strong>#: {index + 1}</strong>
      </p>
      <p>
        <strong>Date & time: </strong>
        {timestamp}
      </p>
      <p>
        <strong>Health issue: </strong>
        {health}
      </p>
      <p>
        <strong>Details: </strong>
        {details}
      </p>
    </div>
  );
};

export default ModalContent;
