"use client";

import React, { useContext, useState } from "react";
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
import { isWalletError, WalletErrorCodes } from "@/types/errors";

export const DEFAULT_CHAIN_ID =
  process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia.id : base.id;


interface WithdrawFormProps {
  vaultId: string | number;
  initialAmount: string | number;
  totalShares: bigint | string;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setLoadingText: (text: string) => void;
  onCancel: () => void;
}

const WithdrawForm = ({
  vaultId,
  initialAmount,
  totalShares,
  isSubmitting,
  setIsSubmitting,
  setLoadingText,
  onCancel,
}: WithdrawFormProps) => {
  const [amount, setAmount] = useState(initialAmount);
  const [withdrawMax, setWithdrawMax] = useState(true);
  
  const userContext = useContext(UserContext);
  
  if (!userContext) {
    throw new Error("WithdrawForm must be used within a UserProvider");
  }
  
  const { refreshUser } = userContext;
  
  const { errors, validateForm, setErrors } =
    useFormValidation(withdrawFormSchema);
  const { useAccount, useSwitchChain, useReadContract } = usePrivyAdapter();
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { redeemTriple } = useRedeemTriple();
  const { waitForTxEvents } = useWaitForTxEvents();

  const { data: shares } = useReadContract({
    abi: abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
    functionName: "convertToShares",
    args: [BigInt(parseEther(`${amount}`)), BigInt(vaultId)],
  });

  const handleWithdraw = async (amount: number) => {
    try {
      setLoadingText("Transaction 1/1: Withdrawing ETH from vault");
      

      const totalSharesBigInt = typeof totalShares === 'string' ? BigInt(totalShares) : totalShares;
      const sharesBigInt = shares ? (typeof shares === 'string' ? BigInt(shares) : shares) : 0n;
      
      // Utiliser la valeur appropriée pour les shares
      const sharesValue = withdrawMax ? totalSharesBigInt : sharesBigInt;
      
      console.log("Withdraw params:", {
        vaultId,
        address,
        shares: sharesValue
      });
      
     
      if (!sharesValue) {
        throw new Error("No shares available to withdraw");
      }
      
      if (!address) {
        throw new Error("No wallet address available for withdrawal");
      }
      
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
    } catch (error: unknown) {
      console.error("Error during withdrawal:", error);

      if (isWalletError(error) && error.code === WalletErrorCodes.USER_REJECTED) {
        setErrors({ form: "Transaction was rejected. Please try again." });
        setLoadingText("");
        return;
      }

      if (error instanceof Error && error.message.includes("Transaction failed")) {
        setErrors({
          form: "Transaction failed. The withdrawal could not be processed. Please try again.",
        });
        setLoadingText("");
        return;
      }

      setErrors({ form: "Something went wrong. Please try again." });
      setLoadingText("");
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
      const amountInput = form.elements.namedItem('amount') as HTMLInputElement;
      
      const formData = {
        amount: Number(amountInput.value),
        maxAmount: Number(initialAmount),
      };

      const validation = validateForm(formData);

      if (!validation.isValid || !validation.data) {
        setIsSubmitting(false);
        return;
      }
      
      const { data } = validation;

      console.log("Attempting withdrawal", {
        vaultId,
        address,
        amount: data.amount,
      });
      await handleWithdraw(data.amount);

      console.log("Withdrawal completed successfully");
    } catch (error: unknown) {
      console.error("Error during withdrawal attempt:", error);
      setErrors({ form: "Something went wrong. Please try again." });
      setLoadingText("");
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
