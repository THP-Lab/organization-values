"use client";

import React, { useEffect, useRef, ReactNode } from 'react';
import styles from "./modal.module.scss";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  title: string;
  subtitle?: string;
  isSubmitting: boolean;
  loadingText?: string;
  onClose: () => void;
  children: ReactNode;
}

const ModalLoadingSpinner = () => {
  return <div className={styles.spinner} />;
};

const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  isSubmitting,
  loadingText = "Submitting...",
  onClose,
  children,
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleFocus = (e: FocusEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    };

    document.addEventListener("focusin", handleFocus);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("focusin", handleFocus);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, onClose, handleClose]);

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
