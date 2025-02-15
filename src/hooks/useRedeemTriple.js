import { useWriteContract } from "wagmi";
import { abi } from "@/backend/abi";
import { parseEther } from "viem";
import { useEnsureCorrectChain } from "./useEnsureCorrectChain";

export function useRedeemTriple() {
  const { writeContractAsync } = useWriteContract();
  const { ensureCorrectChain } = useEnsureCorrectChain();

  const redeemTriple = async (vaultId, address, shares = 0n) => {
    try {
      // Ensure we're on the correct chain before proceeding
      ensureCorrectChain();

      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "redeemTriple",
        args: [shares, address.toLowerCase(), BigInt(vaultId)],
      });
      return hash;
    } catch (err) {
      console.error("Error redeeming triple:", err);
      throw err;
    }
  };

  return { redeemTriple };
}
