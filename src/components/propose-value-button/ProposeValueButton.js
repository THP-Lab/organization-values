"use client";

import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import styles from "./propose-value-button.module.scss";
import Modal from "../modal/Modal";
import ProposeValueForm from "../forms/ProposeValueForm";
import { useAccount, useConnect } from "wagmi";

const ProposeValueButton = () => {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleAction = (action) => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] });
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
      {isModalOpen && (
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
          />
        </Modal>
      )}
    </>
  );
};

export default ProposeValueButton;
