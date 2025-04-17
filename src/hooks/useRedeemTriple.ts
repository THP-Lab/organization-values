import { usePrivyAdapter } from "./usePrivyAuth";
import { abi } from "@/backend/abi";

export function useRedeemTriple() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const redeemTriple = async (vaultId, address, shares = 0n) => {
    try {
      // Convertir en BigInt avec précaution
      const sharesBigInt = BigInt(shares || 0);
      const vaultIdBigInt = BigInt(vaultId);
      
      console.log("Redeeming triple with params:", {
        shares: sharesBigInt,
        receiver: address,
        vaultId: vaultIdBigInt
      });
      
      // Passons les arguments dans le bon ordre selon l'ABI
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
