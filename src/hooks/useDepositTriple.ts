import { usePrivyAdapter } from "./usePrivyAuth";
import { abi } from "@/backend/abi";

export function useDepositTriple() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const depositTriple = async (vaultId: bigint, address: string, value: bigint = 0n) => {
    try {
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "depositTriple",
        args: [vaultId, address],
        value: value,
      });
      return hash;
    } catch (err) {
      console.error("Error depositing to triple:", err);
      throw err;
    }
  };

  return { depositTriple };
}
