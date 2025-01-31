"use client";

import { useState } from "react";
import StakeAgainstForm from "../forms/StakeAgainstForm";
import StakeForForm from "../forms/StakeForForm";
import WithdrawForm from "../forms/WithdrawForm";
import ForumIcon from "../icons/ForumIcon";
import ShareIcon from "../icons/ShareIcon";
import VoteAgainstIcon from "../icons/VoteAgainstIcon";
import VoteForIcon from "../icons/VoteForIcon";
import Modal from "../modal/Modal";
import styles from "./value-actions.module.scss";

// Supports dark and accent hover colors
const ValueActions = ({ name, hoverColor = "dark" }) => {
  const hoverColorClass = styles[hoverColor] ? styles[hoverColor] : "";
  const [isStakeForOpen, setIsStakeForOpen] = useState(false);
  const [isStakeAgainstOpen, setIsStakeAgainstOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <>
      <div className={`${styles.actions} ${hoverColorClass}`}>
        <button
          className={styles.voteButton}
          onClick={() => setIsStakeForOpen(true)}
        >
          <VoteForIcon />
          Vote for
        </button>
        <button
          className={styles.voteButton}
          onClick={() => setIsStakeAgainstOpen(true)}
        >
          <VoteAgainstIcon />
          Vote against
        </button>
        <button
          className={styles.withdrawButton}
          onClick={() => setIsWithdrawOpen(true)}
        >
          Withdraw
        </button>
        <div className={styles.socialActions}>
          <a href="https://www.kialo-edu.com/" target="_blank">
            <ForumIcon />
          </a>
          <a
            href="https://x.com/intent/tweet?url=https%3A%2F%2Fethereum-values.consensys.io%2F"
            target="_blank"
          >
            <ShareIcon />
          </a>
        </div>
      </div>
      {isStakeForOpen && (
        <Modal
          title={"Staking For"}
          subtitle={name}
          onClose={() => setIsStakeForOpen(false)}
        >
          <StakeForForm onCancel={() => setIsStakeForOpen(false)} />
        </Modal>
      )}
      {isStakeAgainstOpen && (
        <Modal
          title={"Staking Against"}
          subtitle={name}
          onClose={() => setIsStakeAgainstOpen(false)}
        >
          <StakeAgainstForm onCancel={() => setIsStakeAgainstOpen(false)} />
        </Modal>
      )}
      {isWithdrawOpen && (
        <Modal
          title={"Withdraw"}
          subtitle={name}
          onClose={() => setIsWithdrawOpen(false)}
        >
          <WithdrawForm onCancel={() => setIsWithdrawOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default ValueActions;
