"use client";

import { useContext } from "react";
import { useDepositTriple } from "@/hooks/useDepositTriple";
import { usePrivyAdapter } from "@/hooks/usePrivyAuth";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { UserContext } from "@/contexts/UserContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { stakeFormSchema } from "./validations";
import { parseEther } from "viem";
import { baseSepolia, base } from "viem/chains";

import styles from "./form.module.scss";

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : base.id;

const StakeForm = ({
  vaultId,
  isSubmitting,
  setIsSubmitting,
  setLoadingText,
  onCancel,
}) => {
  const { refreshUser } = useContext(UserContext);
  const { errors, validateForm, setErrors } =
    useFormValidation(stakeFormSchema);
  const { useAccount, useSwitchChain } = usePrivyAdapter();
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { depositTriple } = useDepositTriple();
  const { waitForTxEvents } = useWaitForTxEvents();

  const handleDeposit = async (amount) => {
    try {
      setLoadingText("Transaction 1/1: Depositing ETH into vault");
      const hash = await depositTriple(
        vaultId,
        address,
        parseEther(`${amount}`)
      );
      console.log("Transaction submitted", { vaultId, amount, hash });
      await waitForTxEvents(hash);
      console.log("Transaction confirmed", { vaultId, amount, hash });

      setLoadingText("Your deposit has been successfully processed!");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      onCancel();
    } catch (error) {
      console.error("Error during deposit:", error);

      // Handle user rejection case
      if (error.code === 4001) {
        setErrors({ form: "Transaction was rejected. Please try again." });
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
      };

      const { isValid, data } = validateForm(formData);

      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      console.log("Attempting deposit", {
        vaultId,
        address,
        amount: data.amount,
      });
      await handleDeposit(data.amount);

      console.log("Deposit completed successfully");
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
        <label htmlFor="amount">Amount to Deposit *</label>
        <span className={styles.note}>
          Note: There is also a 0.3% fee to all current depositors.
        </span>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="amount"
            name="amount"
            defaultValue={0.001}
            step="any"
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
        {correctChain ? (
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Deposit ETH"}
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

export default StakeForm;
