"use client";

import { useState, useEffect, useContext } from "react";
import { useAccount, useConnect } from "wagmi";
import { createPortal } from "react-dom";
import StakeForm from "../forms/StakeForm";
import WithdrawForm from "../forms/WithdrawForm";
import ShareIcon from "../icons/ShareIcon";
import VoteAgainstIcon from "../icons/VoteAgainstIcon";
import VoteForIcon from "../icons/VoteForIcon";
import Modal from "../modal/Modal";
import styles from "./value-actions.module.scss";
import { UserContext } from "../../contexts/UserContext";
import { formatEther } from "viem";
import { linea, baseSepolia } from "viem/chains";

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : linea.id;

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

  const [mounted, setMounted] = useState(false);
  const [isStakeForOpen, setIsStakeForOpen] = useState(false);
  const [isStakeForSubmitting, setIsStakeForSubmitting] = useState(false);
  const [stakeForLoadingText, setStakeForLoadingText] = useState("");
  const [isStakeAgainstOpen, setIsStakeAgainstOpen] = useState(false);
  const [isStakeAgainstSubmitting, setIsStakeAgainstSubmitting] =
    useState(false);
  const [stakeAgainstLoadingText, setStakeAgainstLoadingText] = useState("");
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isWithdrawSubmitting, setIsWithdrawSubmitting] = useState(false);
  const [withdrawLoadingText, setWithdrawLoadingText] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [forPosition, setForPosition] = useState(0);
  const [forPositionAssets, setForPositionAssets] = useState(0);
  const [againstPosition, setAgainstPosition] = useState(0);
  const [againstPositionAssets, setAgainstPositionAssets] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setShareUrl(
      `https://x.com/intent/tweet?text=${encodeURIComponent(
        `${name} is important to our organization, do you agree? Join the discussion here:`
      )}&url=${encodeURIComponent(
        window.location.origin + window.location.pathname
      )}`
    );
  }, [name]);

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

    setForPositionAssets(forVaultPosition ? forVaultPosition.assets : 0);
    setAgainstPositionAssets(
      againstVaultPosition ? againstVaultPosition.assets : 0
    );
    setForPosition(forVaultPosition ? forVaultPosition.shares : 0);
    setAgainstPosition(againstVaultPosition ? againstVaultPosition.shares : 0);
  }, [user, vaultId, counterVaultId]);

  const handleAction = (action) => {
    if (!isConnected && connectors.length > 0) {
      connect({ connector: connectors[0], chainId: DEFAULT_CHAIN_ID });
      return;
    }
    action();
  };

  return (
    <>
      <div className={styles.actionsWrapper}>
        <h4 className={styles.actionsTitle}>My Deposits:</h4>
        <div className={`${styles.actions} ${hoverColorClass}`}>
          <button
            className={`${styles.voteButton} ${
              forPosition > 0 ? styles.staked : ""
            }`}
            onClick={() => handleAction(() => setIsStakeForOpen(true))}
            disabled={againstPosition > 0}
          >
            <VoteForIcon />
            {forPositionAssets > 0
              ? `${
                  Number(formatEther(forPositionAssets)).toFixed(3) === "0.000"
                    ? "< 0.001"
                    : Number(formatEther(forPositionAssets)).toFixed(3)
                } Voted For`
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
            {againstPositionAssets > 0
              ? `${
                  Number(formatEther(againstPositionAssets)).toFixed(3) ===
                  "0.000"
                    ? "< 0.001"
                    : Number(formatEther(againstPositionAssets)).toFixed(3)
                } Voted Against`
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
      </div>
      {mounted &&
        isStakeForOpen &&
        createPortal(
          <Modal
            title={"Staking For"}
            subtitle={name}
            isSubmitting={isStakeForSubmitting}
            loadingText={stakeForLoadingText}
            onClose={() => setIsStakeForOpen(false)}
          >
            <StakeForm
              vaultId={vaultId}
              isSubmitting={isStakeForSubmitting}
              setIsSubmitting={setIsStakeForSubmitting}
              setLoadingText={setStakeForLoadingText}
              onCancel={() => setIsStakeForOpen(false)}
            />
          </Modal>,
          document.body
        )}
      {mounted &&
        isStakeAgainstOpen &&
        createPortal(
          <Modal
            title={"Staking Against"}
            subtitle={name}
            isSubmitting={isStakeAgainstSubmitting}
            loadingText={stakeAgainstLoadingText}
            onClose={() => setIsStakeAgainstOpen(false)}
          >
            <StakeForm
              vaultId={counterVaultId}
              isSubmitting={isStakeAgainstSubmitting}
              setIsSubmitting={setIsStakeAgainstSubmitting}
              setLoadingText={setStakeAgainstLoadingText}
              onCancel={() => setIsStakeAgainstOpen(false)}
            />
          </Modal>,
          document.body
        )}
      {mounted &&
        isWithdrawOpen &&
        createPortal(
          <Modal
            title={"Withdraw"}
            subtitle={name}
            isSubmitting={isWithdrawSubmitting}
            loadingText={withdrawLoadingText}
            onClose={() => setIsWithdrawOpen(false)}
          >
            <WithdrawForm
              vaultId={forPosition > 0 ? vaultId : counterVaultId}
              totalShares={forPosition > 0 ? forPosition : againstPosition}
              initialAmount={
                forPositionAssets > 0
                  ? formatEther(forPositionAssets)
                  : formatEther(againstPositionAssets)
              }
              isSubmitting={isWithdrawSubmitting}
              setIsSubmitting={setIsWithdrawSubmitting}
              setLoadingText={setWithdrawLoadingText}
              onCancel={() => setIsWithdrawOpen(false)}
            />
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ValueActions;
