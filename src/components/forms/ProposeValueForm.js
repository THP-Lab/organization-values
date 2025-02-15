"use client";

import { useContext } from "react";
import { useCreateAtom } from "@/hooks/useCreateAtom";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useGetAtomId } from "@/hooks/useGetAtomId";
import { useCreateTriple } from "@/hooks/useCreateTriple";
import { UserContext } from "@/contexts/UserContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { proposeValueFormSchema } from "./validations";
import { gqlClient } from "@/backend/gqlClient";
import { pinThingMutation } from "@/backend/mutations";
import Link from "next/link";

import styles from "./form.module.scss";

const ProposeValueForm = ({ isSubmitting, setIsSubmitting, onCancel }) => {
  const { refreshUser } = useContext(UserContext);
  const { errors, validateForm, setErrors } = useFormValidation(
    proposeValueFormSchema
  );
  const { address } = useAccount();
  const { createAtom } = useCreateAtom();
  const { waitForTxEvents } = useWaitForTxEvents();
  const { getAtomId } = useGetAtomId();
  const { createTriple } = useCreateTriple();

  const handleChainInteractions = async (ipfsUri, initialStake) => {
    try {
      const createAtomHash = await createAtom(ipfsUri, parseEther("0.0004"));
      console.log("Transaction submitted", { ipfsUri, createAtomHash });

      await waitForTxEvents(createAtomHash);
      console.log("Atom created", { ipfsUri, createAtomHash });

      const atomId = await getAtomId(ipfsUri);
      const createTripleHash = await createTriple(
        process.env.NEXT_PUBLIC_SUBJECT_ID,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        valueName: event.target.valueName.value,
        initialStake: Number(event.target.initialStake.value),
        description: event.target.description.value,
      };

      const { isValid, data } = validateForm(formData);
      if (!isValid) return;

      // Upload value to IPFS
      const result = await gqlClient.mutate({
        mutation: pinThingMutation,
        variables: {
          thing: {
            name: data.valueName,
            description: data.description,
            url: "",
            image: "",
          },
        },
      });

      if (!result.data?.pinThing?.uri) {
        setErrors({ form: "Failed to create value, please try again." });
        return;
      }

      await handleChainInteractions(
        result.data.pinThing.uri,
        data.initialStake
      );
      onCancel();
    } catch (error) {
      console.error("Error during proposal:", error);
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
      refreshUser();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="valueName">Name of Value *</label>
        <input
          type="text"
          id="valueName"
          name="valueName"
          placeholder="Credible Neutrality"
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
            defaultValue={0.001}
            step="0.001"
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
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Ethereum should above all strive to be credibly neutral because..."
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
