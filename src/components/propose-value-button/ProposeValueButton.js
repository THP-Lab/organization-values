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
        <Modal title={"Propose a Value"} onClose={() => setIsModalOpen(false)}>
          <ProposeValueForm />
        </Modal>
      )}
    </>
  );
};

export default ProposeValueButton;
