"use client";

import { useContext } from "react";
import { useCreateAtom } from "@/hooks/useCreateAtom";
import { useWaitForTxEvents } from "@/hooks/useWaitForTxEvents";
import { usePrivyAdapter } from "@/hooks/usePrivyAuth";
import { parseEther } from "viem";
import { baseSepolia, base } from "viem/chains";
import { useGetAtomId } from "@/hooks/useGetAtomId";
import { useCreateTriple } from "@/hooks/useCreateTriple";
import { UserContext, UserContextType } from "@/contexts/UserContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { proposeValueFormSchema } from "./validations";
import { gqlClient } from "@/backend/gqlClient";
import { pinThingMutation } from "@/backend/mutations";
import { WalletError, WalletErrorCodes, isWalletError } from "@/types/errors";

import styles from "./form.module.scss";

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : base.id;

interface ProposeValueFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setLoadingText: (text: string) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

const ProposeValueForm = ({
  isSubmitting,
  setIsSubmitting,
  setLoadingText,
  onCancel,
  onSuccess,
}: ProposeValueFormProps) => {
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    throw new Error("ProposeValueForm must be used within a UserProvider");
  }
  
  const { refreshUser } = userContext;
  const { errors, validateForm, setErrors } = useFormValidation(
    proposeValueFormSchema
  );
  
  const { useAccount, useSwitchChain } = usePrivyAdapter();
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  
  const { createAtom } = useCreateAtom();
  const { waitForTxEvents } = useWaitForTxEvents();
  const { getAtomId } = useGetAtomId();
  const { createTriple } = useCreateTriple();

  const handleChainInteractions = async (ipfsUri: string, initialStake: number) => {
    try {
      // Check if atom already exists
      setLoadingText("Checking if value already exists...");
      let atomId = await getAtomId(ipfsUri);

      if (!atomId) {
        // Only create atom if it doesn't exist
        setLoadingText(
          "Transaction 1/2: Registering your value on the decentralized ledger"
        );
        const createAtomHash = await createAtom(ipfsUri, parseEther("0.0004"));
        console.log("Transaction submitted", { ipfsUri, createAtomHash });

        await waitForTxEvents(createAtomHash);
        console.log("Atom created", { ipfsUri, createAtomHash });

        atomId = await getAtomId(ipfsUri);
      }

      setLoadingText("Transaction 2/2: Connecting your value to the community registry");
      const createTripleHash = await createTriple(
        BigInt(process.env.NEXT_PUBLIC_SUBJECT_ID || "0"),
        BigInt(process.env.NEXT_PUBLIC_PREDICATE_ID || "0"),
        BigInt(atomId || "0"),
        parseEther(`${initialStake}`)
      );

      console.log("Transaction submitted", { atomId, createTripleHash });
      await waitForTxEvents(createTripleHash);
      console.log("Triple created", { atomId, createTripleHash });

      setLoadingText("Your value has been successfully proposed and is now visible to the community!");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      onSuccess();
      onCancel();
    } catch (error: unknown) {
      console.error("Error during chain interactions:", {
        error,
        address,
        message: error instanceof Error ? error.message : String(error),
      });

      // Utiliser les types et utilitaires partagés
      if (isWalletError(error)) {
        console.log("error code:", error.code);
        
        if (error.code === WalletErrorCodes.USER_REJECTED) {
          setErrors({ form: "Transaction was rejected. Please try again." });
          setLoadingText("");
          return;
        }
      }

      // Handle other errors
      setErrors({ form: "Something went wrong. Please try again." });
      setLoadingText("");
      throw error;
    } finally {
      refreshUser();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Return early if not on correct chain
    if (chain?.id !== DEFAULT_CHAIN_ID) {
      return;
    }

    setIsSubmitting(true);

    try {
      const form = event.target as HTMLFormElement;
      
      const formData = {
        valueName: (form.elements.namedItem('valueName') as HTMLInputElement).value,
        initialStake: Number((form.elements.namedItem('initialStake') as HTMLInputElement).value),
        description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      };

      const validation = validateForm(formData);
      
      if (!validation.isValid || !validation.data) {
        setIsSubmitting(false);
        return;
      }
      
      const { data } = validation;

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
        setLoadingText("");
        return;
      }

      await handleChainInteractions(
        result.data.pinThing.uri,
        data.initialStake
      );
    } catch (error: unknown) {
      console.error("Error during proposal:", error);
      setErrors({ form: "Something went wrong. Please try again." });
      setLoadingText("");
    } finally {
      setIsSubmitting(false);
      refreshUser();
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
        <label htmlFor="valueName">Name of Value *</label>
        <input
          type="text"
          id="valueName"
          name="valueName"
          placeholder="Collaborative Innovation"
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
        <span className={styles.note}>
          Note: There is a 0.004 ETH fee for proposing a value.
        </span>
        <div className={styles.inputGroup}>
          <input
            type="number"
            id="initialStake"
            name="initialStake"
            defaultValue={0.001}
            step="any"
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
          rows={3}
          placeholder="Our community should prioritize transparency because it builds trust and enables better decision making for all stakeholders..."
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
        {correctChain ? (
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Propose Value"}
          </button>
        ) : (
          <button
            className={styles.switchNetworkButton}
            type="button"
            onClick={handleSwitch}
          >
            Switch to Required Network
          </button>
        )}
      </div>
    </form>
  );
};

export default ProposeValueForm;
