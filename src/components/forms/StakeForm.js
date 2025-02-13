"use client";

import { useContext, useState } from "react";
import { useDepositTriple } from "@/hooks/useDepositTriple";
import styles from "./form.module.scss";
import { useAccount } from "wagmi";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { UserContext } from "@/contexts/UserContext";

const StakeForm = ({ vaultId, isSubmitting, setIsSubmitting, onCancel }) => {
  const { refreshUser } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const { address } = useAccount();
  const { depositTriple } = useDepositTriple();
  const { waitForTxEvents } = useWaitForTxEvents();

  const handleDeposit = async (amount) => {
    try {
      const hash = await depositTriple(vaultId, address, amount);
      console.log("Transaction submitted", { vaultId, amount, hash });
      await waitForTxEvents(hash);
      console.log("Transaction confirmed", { vaultId, amount, hash });
      refreshUser();
      onCancel();
    } catch (error) {
      console.error("Error during deposit:", error);

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

      console.log("Attempting deposit", { vaultId, address, amount });
      await handleDeposit(amount);

      console.log("Deposit completed successfully");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="amount">Amount to Deposit *</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="amount"
            name="amount"
            defaultValue={0.001}
            min="0.001"
            step="0.001"
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
          {isSubmitting ? "Loading..." : "Deposit ETH"}
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

export default StakeForm;
