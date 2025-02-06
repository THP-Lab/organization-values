"use client";

import { stakeAgainst } from "@/app/(actions)/stake-against.action";
import { useState, useTransition } from "react";

import styles from "./form.module.scss";

const StakeAgainstForm = ({ valueId, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setErrors({});

      startTransition(async () => {
        const result = await stakeAgainst(valueId, formData);
        if (!result.success) {
          console.log("Errors", result.errors);
          setErrors(result.errors);
        } else {
          console.log("Submitted value", result);
        }
        setIsSubmitting(false);
      });
    } catch (err) {
      console.error(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form action={onSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="amount">Amount to Deposit *</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="0.001"
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
        <button type="submit" disabled={isSubmitting || isPending}>
          {isSubmitting || isPending ? "Loading..." : "Deposit ETH"}
        </button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StakeAgainstForm;
