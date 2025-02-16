"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./modal.module.scss";
import CloseIcon from "../icons/CloseIcon";

const ModalLoadingSpinner = () => {
  return <div className={styles.spinner} />;
};

const Modal = ({
  title,
  subtitle,
  isSubmitting,
  loadingText = "Submitting...",
  onClose,
  children,
}) => {
  const closeButtonRef = useRef(null);
  const containerRef = useRef(null);

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
    }
  }, [isSubmitting, onClose]);

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
        handleClose();
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, handleClose]);

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={containerRef}
        className={`${styles.container} ${isSubmitting ? styles.loading : ""}`}
      >
        {isSubmitting && (
          <div className={styles.loadingOverlay}>
            <ModalLoadingSpinner />
            {loadingText && <p className={styles.loadingText}>{loadingText}</p>}
          </div>
        )}
        <div className={styles.content}>
          <button
            ref={closeButtonRef}
            className={styles.close}
            onClick={handleClose}
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
