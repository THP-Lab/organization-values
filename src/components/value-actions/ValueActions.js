"use client";

import { useState, useEffect, useContext } from "react";
import { useAccount, useConnect } from "wagmi";
import StakeAgainstForm from "../forms/StakeAgainstForm";
import StakeForForm from "../forms/StakeForForm";
import WithdrawForm from "../forms/WithdrawForm";
import ForumIcon from "../icons/ForumIcon";
import ShareIcon from "../icons/ShareIcon";
import VoteAgainstIcon from "../icons/VoteAgainstIcon";
import VoteForIcon from "../icons/VoteForIcon";
import Modal from "../modal/Modal";
import styles from "./value-actions.module.scss";
import { UserContext } from "../providers/UserProvider";

// Supports dark and accent hover colors
const ValueActions = ({ name, valueId, hoverColor = "dark", forumPost }) => {
  const hoverColorClass = styles[hoverColor] ? styles[hoverColor] : "";

  const { user } = useContext(UserContext);
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const [isStakeForOpen, setIsStakeForOpen] = useState(false);
  const [isStakeAgainstOpen, setIsStakeAgainstOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [forStake, setForStake] = useState(0);
  const [againstStake, setAgainstStake] = useState(0);

  useEffect(() => {
    setShareUrl(
      `https://x.com/intent/tweet?url=${encodeURIComponent(
        window.location.origin + window.location.pathname
      )}`
    );
  }, []);

  useEffect(() => {
    if (!user || !user.values) {
      setForStake(0);
      setAgainstStake(0);
      return;
    }

    const value = user.values.find((value) => value.id === valueId);
    if (value) {
      setForStake(value.forStake);
      setAgainstStake(value.againstStake);
    } else {
      setForStake(0);
      setAgainstStake(0);
    }
  }, [user, valueId]);

  const handleAction = (action) => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0] });
      return;
    }
    action();
  };

  return (
    <>
      <div className={`${styles.actions} ${hoverColorClass}`}>
        <button
          className={`${styles.voteButton} ${
            forStake > 0 ? styles.staked : ""
          }`}
          onClick={() => handleAction(() => setIsStakeForOpen(true))}
          disabled={againstStake > 0}
        >
          <VoteForIcon />
          {forStake > 0 ? `${forStake.toFixed(3)} Voted For` : "Vote for"}
        </button>
        <button
          className={`${styles.voteButton} ${
            againstStake > 0 ? styles.staked : ""
          }`}
          onClick={() => handleAction(() => setIsStakeAgainstOpen(true))}
          disabled={forStake > 0}
        >
          <VoteAgainstIcon />
          {againstStake > 0
            ? `${againstStake.toFixed(3)} Voted Against`
            : "Vote against"}
        </button>
        {(forStake > 0 || againstStake > 0) && (
          <button
            className={styles.withdrawButton}
            onClick={() => handleAction(() => setIsWithdrawOpen(true))}
          >
            Withdraw
          </button>
        )}
        <div className={styles.socialActions}>
          {forumPost && (
            <a href={forumPost} target="_blank">
              <ForumIcon />
            </a>
          )}
          <a href={shareUrl} target="_blank">
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
          <StakeForForm
            valueId={valueId}
            onCancel={() => setIsStakeForOpen(false)}
          />
        </Modal>
      )}
      {isStakeAgainstOpen && (
        <Modal
          title={"Staking Against"}
          subtitle={name}
          onClose={() => setIsStakeAgainstOpen(false)}
        >
          <StakeAgainstForm
            valueId={valueId}
            onCancel={() => setIsStakeAgainstOpen(false)}
          />
        </Modal>
      )}
      {isWithdrawOpen && (
        <Modal
          title={"Withdraw"}
          subtitle={name}
          onClose={() => setIsWithdrawOpen(false)}
        >
          <WithdrawForm
            valueId={valueId}
            onCancel={() => setIsWithdrawOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ValueActions;
