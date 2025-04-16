import { useWriteContract } from "wagmi";
import { abi } from "@/backend/abi";

export function useCreateTriple() {
  const { writeContractAsync } = useWriteContract();

  const createTriple = async (
    subjectId,
    predicateId,
    objectId,
    initialDeposit = 0n
  ) => {
    try {
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "createTriple",
        args: [BigInt(subjectId), BigInt(predicateId), BigInt(objectId)],
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
