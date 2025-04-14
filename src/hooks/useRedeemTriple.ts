import { useWriteContract } from "wagmi";
import { abi } from "@/backend/abi";

export function useRedeemTriple() {
  const { writeContractAsync } = useWriteContract();

  const redeemTriple = async (vaultId, address, shares = 0n) => {
    try {
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
