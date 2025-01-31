"use client";

import { useEffect, useRef } from "react";
import styles from "./modal.module.scss";
import CloseIcon from "../icons/CloseIcon";

const Modal = ({ title, subtitle, onClose, children }) => {
  const closeButtonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleFocus = (e) => {
      if (!containerRef.current?.contains(e.target)) {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div ref={containerRef} className={styles.container}>
        <div className={styles.content}>
          <button
            ref={closeButtonRef}
            className={styles.close}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
          {subtitle && (
            <p id="modal-subtitle" className={styles.subtitle}>
              {subtitle}
            </p>
          )}
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
