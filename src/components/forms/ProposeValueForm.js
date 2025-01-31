"use client";

import { createValue } from "@/app/(actions)/create-value.action";
import { useState, useTransition } from "react";

import styles from "./form.module.scss";

const ProposeValueForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setErrors({});

      startTransition(async () => {
        const result = await createValue(formData);
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
        <label htmlFor="valueName">Name of Value *</label>
        <input
          type="text"
          id="valueName"
          name="valueName"
          placeholder="Credible Neutrality"
          required
          minLength={3}
          maxLength={50}
          aria-describedby={errors.valueName ? "valueName-error" : undefined}
        />
        {errors.valueName && (
          <span id="valueName-error" className={styles.error}>
            {errors.valueName}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="initialStake">Initial Stake *</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="initialStake"
            name="initialStake"
            placeholder="0.001"
            min="0.001"
            step="0.001"
            required
            aria-describedby={
              errors.initialStake ? "initialStake-error" : undefined
            }
            className={styles.ethValueInput}
          />
        </div>
        {errors.initialStake && (
          <span id="initialStake-error" className={styles.error}>
            {errors.initialStake}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="forumPost">Forum Post</label>
        <input
          type="url"
          id="forumPost"
          name="forumPost"
          pattern="^https:\/\/kialo\.com\/.*"
          placeholder="https://kialo.com/"
          aria-describedby={errors.forumPost ? "forumPost-error" : undefined}
        />
        {errors.forumPost && (
          <span id="forumPost-error" className={styles.error}>
            {errors.forumPost}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Ethereum should above all strive to be credibly neutral because..."
          required
          minLength={20}
          maxLength={640}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        {errors.description && (
          <span id="description-error" className={styles.error}>
            {errors.description}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" disabled={isSubmitting || isPending}>
          {isSubmitting || isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ProposeValueForm;
