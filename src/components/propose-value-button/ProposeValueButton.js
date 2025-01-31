"use client";

import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import styles from "./propose-value-button.module.scss";
import Modal from "../modal/Modal";
import ProposeValueForm from "../forms/ProposeValueForm";

const ProposeValueButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
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
