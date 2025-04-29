import { usePrivyAdapter } from "./usePrivyAuth";
import { abi } from "@/backend/abi";

export function useCreateTriple() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const createTriple = async (
    subjectId: bigint,
    predicateId: bigint,
    objectId: bigint,
    initialDeposit: bigint = 0n
  ) => {
    try {
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: "createTriple",
        args: [subjectId, predicateId, objectId],
        value: initialDeposit,
      });
      return hash;
    } catch (err) {
      console.error("Error creating triple:", err);
      throw err;
    }
  };

  return { createTriple };
}
