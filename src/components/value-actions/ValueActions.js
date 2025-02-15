"use client";

import { useState, useEffect, useContext } from "react";
import { useAccount, useConnect } from "wagmi";
import StakeForm from "../forms/StakeForm";
import WithdrawForm from "../forms/WithdrawForm";
import ShareIcon from "../icons/ShareIcon";
import VoteAgainstIcon from "../icons/VoteAgainstIcon";
import VoteForIcon from "../icons/VoteForIcon";
import Modal from "../modal/Modal";
import styles from "./value-actions.module.scss";
import { UserContext } from "../../contexts/UserContext";
import { formatEther } from "viem";

// Supports dark and accent hover colors
const ValueActions = ({
  name,
  valueId,
  vaultId,
  counterVaultId,
  hoverColor = "dark",
}) => {
  const hoverColorClass = styles[hoverColor] ? styles[hoverColor] : "";

  const { user } = useContext(UserContext);
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const [isStakeForOpen, setIsStakeForOpen] = useState(false);
  const [isStakeForSubmitting, setIsStakeForSubmitting] = useState(false);
  const [isStakeAgainstOpen, setIsStakeAgainstOpen] = useState(false);
  const [isStakeAgainstSubmitting, setIsStakeAgainstSubmitting] =
    useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isWithdrawSubmitting, setIsWithdrawSubmitting] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [forPosition, setForPosition] = useState(0);
  const [againstPosition, setAgainstPosition] = useState(0);

  useEffect(() => {
    setShareUrl(
      `https://x.com/intent/tweet?url=${encodeURIComponent(
        window.location.origin + window.location.pathname
      )}`
    );
  }, []);

  useEffect(() => {
    if (!user) {
      setForPosition(0);
      setAgainstPosition(0);
      return;
    }

    const forVaultPosition = user.vaultPositions.find(
      (position) => position.vaultId === vaultId
    );
    const againstVaultPosition = user.counterVaultPositions.find(
      (position) => position.vaultId === counterVaultId
    );

    setForPosition(forVaultPosition ? forVaultPosition.shares : 0);
    setAgainstPosition(againstVaultPosition ? againstVaultPosition.shares : 0);
  }, [user, vaultId, counterVaultId]);

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
            forPosition > 0 ? styles.staked : ""
          }`}
          onClick={() => handleAction(() => setIsStakeForOpen(true))}
          disabled={againstPosition > 0}
        >
          <VoteForIcon />
          {forPosition > 0
            ? `${Number(formatEther(forPosition)).toFixed(3)} Voted For`
            : "Vote for"}
        </button>
        <button
          className={`${styles.voteButton} ${
            againstPosition > 0 ? styles.staked : ""
          }`}
          onClick={() => handleAction(() => setIsStakeAgainstOpen(true))}
          disabled={forPosition > 0}
        >
          <VoteAgainstIcon />
          {againstPosition > 0
            ? `${Number(formatEther(againstPosition)).toFixed(3)} Voted Against`
            : "Vote against"}
        </button>
        {(forPosition > 0 || againstPosition > 0) && (
          <button
            className={styles.withdrawButton}
            onClick={() => handleAction(() => setIsWithdrawOpen(true))}
          >
            Withdraw
          </button>
        )}
        <div className={styles.socialActions}>
          <a href={shareUrl} target="_blank">
            <ShareIcon />
          </a>
        </div>
      </div>
      {isStakeForOpen && (
        <Modal
          title={"Staking For"}
          subtitle={name}
          isSubmitting={isStakeForSubmitting}
          onClose={() => setIsStakeForOpen(false)}
        >
          <StakeForm
            vaultId={vaultId}
            isSubmitting={isStakeForSubmitting}
            setIsSubmitting={setIsStakeForSubmitting}
            onCancel={() => setIsStakeForOpen(false)}
          />
        </Modal>
      )}
      {isStakeAgainstOpen && (
        <Modal
          title={"Staking Against"}
          subtitle={name}
          isSubmitting={isStakeAgainstSubmitting}
          onClose={() => setIsStakeAgainstOpen(false)}
        >
          <StakeForm
            vaultId={counterVaultId}
            isSubmitting={isStakeAgainstSubmitting}
            setIsSubmitting={setIsStakeAgainstSubmitting}
            onCancel={() => setIsStakeAgainstOpen(false)}
          />
        </Modal>
      )}
      {isWithdrawOpen && (
        <Modal
          title={"Withdraw"}
          subtitle={name}
          isSubmitting={isWithdrawSubmitting}
          onClose={() => setIsWithdrawOpen(false)}
        >
          <WithdrawForm
            vaultId={forPosition > 0 ? vaultId : counterVaultId}
            initialAmount={
              forPosition > 0
                ? formatEther(forPosition)
                : formatEther(againstPosition)
            }
            isSubmitting={isWithdrawSubmitting}
            setIsSubmitting={setIsWithdrawSubmitting}
            onCancel={() => setIsWithdrawOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ValueActions;
