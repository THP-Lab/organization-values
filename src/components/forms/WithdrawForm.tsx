"use client";

import { useContext, useState } from "react";
import { useRedeemTriple } from "@/hooks/useRedeemTriple";
import { usePrivyAdapter } from "@/hooks/usePrivyAuth";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { UserContext } from "@/contexts/UserContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { abi } from "@/backend/abi";
import { withdrawFormSchema } from "./validations";
import { parseEther } from "viem";
import { baseSepolia, base } from "viem/chains";
import styles from "./form.module.scss";

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : base.id;

const WithdrawForm = ({
  vaultId,
  initialAmount,
  totalShares,
  isSubmitting,
  setIsSubmitting,
  setLoadingText,
  onCancel,
}) => {
  const [amount, setAmount] = useState(initialAmount);
  const [withdrawMax, setWithdrawMax] = useState(true);
  const { refreshUser } = useContext(UserContext);
  const { errors, validateForm, setErrors } =
    useFormValidation(withdrawFormSchema);
  const { useAccount, useSwitchChain, useReadContract } = usePrivyAdapter();
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { redeemTriple } = useRedeemTriple();
  const { waitForTxEvents } = useWaitForTxEvents();

  const { data: shares } = useReadContract({
    abi: abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    functionName: "convertToShares",
    args: [BigInt(parseEther(`${amount}`)), BigInt(vaultId)],
  });

  const handleWithdraw = async (amount) => {
    try {
      setLoadingText("Transaction 1/1: Withdrawing ETH from vault");
      
      // Assurez-vous que les arguments sont du bon type
      const sharesValue = withdrawMax ? totalShares : shares;
      
      console.log("Withdraw params:", {
        vaultId,
        address,
        shares: sharesValue
      });
      
      const hash = await redeemTriple(
        vaultId,
        address,
        sharesValue
      );
      
      console.log("Transaction submitted", { vaultId, amount, hash });
      await waitForTxEvents(hash);
      console.log("Transaction confirmed", { vaultId, amount, hash });

      setLoadingText("Your withdrawal has been successfully processed!");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      onCancel();
    } catch (error) {
      console.error("Error during withdrawal:", error);

      // Handle user rejection case
      if (error.code === 4001) {
        setErrors({ form: "Transaction was rejected. Please try again." });
        setLoadingText("");
        return;
      }

      // Handle transaction revert
      if (error.message.includes("Transaction failed")) {
        setErrors({
          form: "Transaction failed. The withdrawal could not be processed. Please try again.",
        });
        setLoadingText("");
        return;
      }

      // Handle other errors
      setErrors({ form: "Something went wrong. Please try again." });
      setLoadingText("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Return early if not on correct chain
    if (chain?.id !== DEFAULT_CHAIN_ID) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = {
        amount: Number(event.target.amount.value),
        maxAmount: Number(initialAmount),
      };

      const { isValid, data } = validateForm(formData);

      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      console.log("Attempting withdrawal", {
        vaultId,
        address,
        amount: data.amount,
      });
      await handleWithdraw(data.amount);

      console.log("Withdrawal completed successfully");
    } finally {
      refreshUser();
      setIsSubmitting(false);
    }
  };

  const correctChain = chain?.id === DEFAULT_CHAIN_ID;

  const handleSwitch = () => {
    if (switchChain) {
      switchChain({ chainId: DEFAULT_CHAIN_ID });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="amount">Amount to Withdraw *</label>
        <span className={styles.note}>Note: There is also a 0.3% fee.</span>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="amount"
            name="amount"
            max={initialAmount}
            step="any"
            defaultValue={initialAmount}
            required
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={styles.ethValueInput}
            style={{ color: withdrawMax ? "gray" : "rgb(0, 0, 0)" }}
            onChange={(e) => setAmount(e.target.value)}
            disabled={withdrawMax}
          />
        </div>
        <div className={`${styles.inputGroup} ${styles.checkboxGroup}`}>
          <label htmlFor="withdrawMax">
            <input
              type="checkbox"
              id="withdrawMax"
              name="withdrawMax"
              checked={withdrawMax}
              onChange={() => setWithdrawMax(!withdrawMax)}
            />
            <span>Withdraw maximum amount</span>
          </label>
        </div>
        {errors.amount && (
          <span id="amount-error" className={styles.error}>
            {errors.amount}
          </span>
        )}
      </div>

      {errors.form && (
        <div className={styles.formGroup}>
          <span className={styles.error}>{errors.form}</span>
        </div>
      )}

      <div className={styles.actions}>
        {correctChain ? (
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Withdraw ETH"}
          </button>
        ) : (
          <button
            className={styles.switchNetworkButton}
            type="button"
            onClick={handleSwitch}
          >
            Switch to base Network
          </button>
        )}
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WithdrawForm;
