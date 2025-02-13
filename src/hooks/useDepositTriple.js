import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { abi } from "@/backend/abi";
import { useEnsureCorrectChain } from "./useEnsureCorrectChain";

export function useDepositTriple() {
  const { writeContractAsync } = useWriteContract();
  const { ensureCorrectChain } = useEnsureCorrectChain();

  const depositTriple = async (vaultId, address, value) => {
    try {
      // Ensure we're on the correct chain before proceeding
      ensureCorrectChain();

      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "depositTriple",
        args: [address.toLowerCase(), BigInt(vaultId)],
        value: parseEther(value),
      });
      return hash;
    } catch (err) {
      console.error("Error depositing triple:", err);
      throw err;
    }
  };

  return { depositTriple };
}
