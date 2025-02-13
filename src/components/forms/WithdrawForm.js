"use client";

import { useContext, useState } from "react";
import { useRedeemTriple } from "@/hooks/useRedeemTriple";
import styles from "./form.module.scss";
import { useAccount } from "wagmi";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { UserContext } from "@/contexts/UserContext";

const WithdrawForm = ({
  vaultId,
  initialAmount,
  isSubmitting,
  setIsSubmitting,
  onCancel,
}) => {
  const { refreshUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const { address } = useAccount();
  const { redeemTriple } = useRedeemTriple();
  const { waitForTxEvents } = useWaitForTxEvents();

  const handleWithdraw = async (amount) => {
    try {
      const hash = await redeemTriple(vaultId, address, amount);
      console.log("Transaction submitted", { vaultId, amount, hash });
      await waitForTxEvents(hash);
      console.log("Transaction confirmed", { vaultId, amount, hash });
      onCancel();
    } catch (error) {
      console.error("Error during withdrawal:", error);

      // Handle user rejection case
      if (error.code === 4001) {
        setErrors({ amount: "Transaction was rejected. Please try again." });
        return;
      }

      // Handle other errors
      setErrors({ amount: "Something went wrong. Please try again." });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.target);
      const amount = formData.get("amount");

      console.log("Attempting withdrawal", { vaultId, address, amount });
      await handleWithdraw(amount);

      console.log("Withdrawal completed successfully");
    } finally {
      refreshUser();
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="amount">Amount to Withdraw *</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="amount"
            name="amount"
            max={initialAmount}
            defaultValue={initialAmount}
            required
            aria-describedby={errors.amount ? "amount-error" : undefined}
            className={styles.ethValueInput}
          />
        </div>
        {errors.amount && (
          <span id="amount-error" className={styles.error}>
            {errors.amount}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Withdraw ETH"}
        </button>
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
