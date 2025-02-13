import { useWriteContract } from "wagmi";
import { toHex } from "viem";
import { abi } from "@/backend/abi";
import { useEnsureCorrectChain } from "./useEnsureCorrectChain";

export function useCreateAtom() {
  const { writeContractAsync } = useWriteContract();
  const { ensureCorrectChain } = useEnsureCorrectChain();

  const createAtom = async (uri, initialDeposit = 0n) => {
    try {
      // Ensure we're on the correct chain before proceeding
      ensureCorrectChain();

      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "createAtom",
        args: [toHex(uri)],
        value: initialDeposit,
      });
      return hash;
    } catch (err) {
      console.error("Error creating atom:", err);
      throw err;
    }
  };

  return { createAtom };
}
