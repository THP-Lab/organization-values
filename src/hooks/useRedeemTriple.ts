import { usePrivyAdapter } from "./usePrivyAuth";
import { abi } from "@/backend/abi";

export function useRedeemTriple() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const redeemTriple = async (vaultId: bigint | string | number, address: string, shares: bigint | string | number = 0n) => {
    try {
      // Convertir en BigInt avec précaution
      const sharesBigInt = BigInt(shares || 0);
      
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "redeemTriple",
        args: [BigInt(vaultId), address, sharesBigInt],
      });
      
      return hash;
    } catch (err) {
      console.error("Error redeeming from triple:", err);
      throw err;
    }
  };

  return { redeemTriple };
}
