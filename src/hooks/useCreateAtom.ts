import { usePrivyAdapter } from "./usePrivyAuth";
import { toHex } from "viem";
import { abi } from "@/backend/abi";

export function useCreateAtom() {
  const { useWriteContract } = usePrivyAdapter();
  const { writeContractAsync } = useWriteContract();

  const createAtom = async (uri, initialDeposit = 0n) => {
    try {
      const hash = await writeContractAsync({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        functionName: "createAtom",
        args: [toHex(uri)],
        value: initialDeposit,
      });
      return hash;
    } catch (err) {
      console.error("Error creating atom:", err);
      throw err;
    }
  };

  return { createAtom };
}
