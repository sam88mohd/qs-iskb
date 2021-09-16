import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/modal.module.css";

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.styledModalOverlay}>
      <div className={styles.styledModal}>
        <div className={styles.styledModalHeader}>
          <button onClick={handleCloseClick}>x</button>
        </div>
        {title && <div className={styles.styledModalTitle}>{title}</div>}
        <div className={styles.styledModalBody}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
