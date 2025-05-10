import { usePrivyAdapter } from "./usePrivyAuth";
import { abi } from "@/backend/abi";

export function useDepositTriple() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const depositTriple = async (vaultId, address, value = 0n) => {
    try {
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "depositTriple",
        args: [address.toLowerCase(), BigInt(vaultId)],
        value: value,
      });
      return hash;
    } catch (err) {
      console.error("Error depositing triple:", err);
      throw err;
    }
  };

  return { depositTriple };
}
