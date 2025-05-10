import { usePrivyAdapter } from "./usePrivyAuth";
import { abi } from "@/backend/abi";

export function useRedeemTriple() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const redeemTriple = async (vaultId, address, shares = 0n) => {
    try {
      // Convert to BigInt carefully
      const sharesBigInt = BigInt(shares || 0);
      const vaultIdBigInt = BigInt(vaultId);
      
      console.log("Redeeming triple with params:", {
        shares: sharesBigInt,
        receiver: address,
        vaultId: vaultIdBigInt
      });
      
      // Pass arguments in the correct order according to the ABI
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "redeemTriple",
        args: [sharesBigInt, address.toLowerCase(), vaultIdBigInt],
      });
      return hash;
    } catch (err) {
      console.error("Error redeeming triple:", err);
      throw err;
    }
  };

  return { redeemTriple };
}
