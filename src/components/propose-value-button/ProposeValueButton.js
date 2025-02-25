"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import PlusIcon from "../icons/PlusIcon";
import styles from "./propose-value-button.module.scss";
import Modal from "../modal/Modal";
import ProposeValueForm from "../forms/ProposeValueForm";
import { useAccount, useConnect } from "wagmi";
import { linea, baseSepolia } from "viem/chains";

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : linea.id;

const ProposeValueButton = ({ onSuccess }) => {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleAction = (action) => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0], chainId: DEFAULT_CHAIN_ID });
      return;
    }
    action();
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={() => handleAction(() => setIsModalOpen(true))}
      >
        <PlusIcon />
        Propose a Value
      </button>
      {mounted &&
        isModalOpen &&
        createPortal(
          <Modal
            title={"Propose a Value"}
            isSubmitting={isSubmitting}
            loadingText={loadingText}
            onClose={() => setIsModalOpen(false)}
          >
            <ProposeValueForm
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              setLoadingText={setLoadingText}
              onCancel={() => setIsModalOpen(false)}
              onSuccess={() => onSuccess()}
            />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ProposeValueButton;
