"use client";

import { useContext } from "react";
import { useRedeemTriple } from "@/hooks/useRedeemTriple";
import { useAccount } from "wagmi";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { UserContext } from "@/contexts/UserContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { withdrawFormSchema } from "./validations";
import { parseEther } from "viem";
import styles from "./form.module.scss";

const WithdrawForm = ({
  vaultId,
  initialAmount,
  isSubmitting,
  setIsSubmitting,
  setLoadingText,
  onCancel,
}) => {
  const { refreshUser } = useContext(UserContext);
  const { errors, validateForm, setErrors } =
    useFormValidation(withdrawFormSchema);
  const { address } = useAccount();
  const { redeemTriple } = useRedeemTriple();
  const { waitForTxEvents } = useWaitForTxEvents();

  const handleWithdraw = async (amount) => {
    try {
      setLoadingText("Transaction 1/1: Withdrawing ETH from vault");
      const hash = await redeemTriple(
        vaultId,
        address,
        parseEther(`${amount}`)
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

      {errors.form && (
        <div className={styles.formGroup}>
          <span className={styles.error}>{errors.form}</span>
        </div>
      )}

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
