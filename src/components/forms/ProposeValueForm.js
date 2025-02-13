"use client";

import { createValue } from "@/app/(actions)/create-value.action";
import { useContext, useEffect, useState } from "react";
import { useCreateAtom } from "@/hooks/useCreateAtom";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { useAccount } from "wagmi";
import styles from "./form.module.scss";
import { parseEther } from "viem";
import { useGetAtomId } from "@/hooks/useGetAtomId";
import { useCreateTriple } from "@/hooks/useCreateTriple";
import { useActionState } from "react";
import { UserContext } from "@/contexts/UserContext";

const ProposeValueForm = ({ isSubmitting, setIsSubmitting, onCancel }) => {
  const { refreshUser } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const { address } = useAccount();
  const { createAtom } = useCreateAtom();
  const { waitForTxEvents } = useWaitForTxEvents();
  const { getAtomId } = useGetAtomId();
  const { createTriple } = useCreateTriple();

  const initialState = {
    success: false,
    ipfsUri: null,
    initialStake: null,
    errors: {},
  };

  const handleChainInteractions = async (ipfsUri, initialStake) => {
    try {
      const createAtomHash = await createAtom(ipfsUri, parseEther("0.0004"));
      console.log("Transaction submitted", { ipfsUri, createAtomHash });

      await waitForTxEvents(createAtomHash);
      console.log("Atom created", { ipfsUri, createAtomHash });

      const atomId = await getAtomId(ipfsUri);
      const createTripleHash = await createTriple(
        535,
        process.env.NEXT_PUBLIC_PREDICATE_ID,
        Number(atomId),
        parseEther(`${initialStake}`)
      );

      console.log("Transaction submitted", { atomId, createTripleHash });
      await waitForTxEvents(createTripleHash);
      console.log("Triple created", { atomId, createTripleHash });

      onCancel();
    } catch (error) {
      console.error("Error during chain interactions:", {
        error,
        address,
        message: error.message,
      });

      console.log("error code: ", error.code);

      // Handle user rejection case
      if (error.code === 4001) {
        setErrors({ form: "Transaction was rejected. Please try again." });
        return;
      }

      // Handle other errors
      setErrors({ form: "Something went wrong. Please try again." });
      throw error;
    } finally {
      refreshUser();
    }
  };

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        console.log("Attempting proposal", { address });

        const result = await createValue(formData);
        if (!result.success || !result.ipfsUri) {
          return {
            ...prevState,
            errors: result.errors,
          };
        }

        await handleChainInteractions(result.ipfsUri, result.initialStake);
        console.log("Proposal completed successfully");

        return {
          success: true,
          ipfsUri: result.ipfsUri,
          initialStake: result.initialStake,
          errors: {},
        };
      } catch (error) {
        console.error("Error during proposal:", {
          error,
          address,
          message: error.message,
        });
        return {
          ...prevState,
          errors: { form: error.message },
        };
      }
    },
    initialState
  );

  useEffect(() => {
    setIsSubmitting(isPending);

    return () => setIsSubmitting(false);
  }, [isPending, setIsSubmitting]);

  return (
    <form action={formAction} className={styles.form}>
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
          aria-describedby={
            state.errors.valueName ? "valueName-error" : undefined
          }
        />
        {state.errors.valueName && (
          <span id="valueName-error" className={styles.error}>
            {state.errors.valueName}
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
            defaultValue={0.001}
            min="0.001"
            step="0.001"
            required
            aria-describedby={
              state.errors.initialStake ? "initialStake-error" : undefined
            }
            className={styles.ethValueInput}
          />
        </div>
        {state.errors.initialStake && (
          <span id="initialStake-error" className={styles.error}>
            {state.errors.initialStake}
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
          aria-describedby={
            state.errors.forumPost ? "forumPost-error" : undefined
          }
        />
        {state.errors.forumPost && (
          <span id="forumPost-error" className={styles.error}>
            {state.errors.forumPost}
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
            state.errors.description ? "description-error" : undefined
          }
        />
        {state.errors.description && (
          <span id="description-error" className={styles.error}>
            {state.errors.description}
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ProposeValueForm;
