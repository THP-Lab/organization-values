import { useSwitchChain as useWagmiSwitchChain, useAccount } from "wagmi";
import { linea, baseSepolia } from "wagmi/chains";

export function useEnsureCorrectChain() {
  const { switchChain: wagmiSwitchChain } = useWagmiSwitchChain();
  const { chainId: currentChainId, address } = useAccount();

  const targetChain =
    process.env.NEXT_PUBLIC_ENV === "development" ? baseSepolia : linea;

  const ensureCorrectChain = () => {
    if (!address) {
      throw new Error("Wallet not connected");
    }

    if (currentChainId === targetChain.id) {
      return; // Already on correct chain
    }

    try {
      wagmiSwitchChain({ chainId: targetChain.id });
    } catch (error) {
      console.error("Failed to switch chain:", {
        error,
        errorMessage: error.message,
        targetChainId: targetChain.id,
      });
      throw error;
    }
  };

  return { ensureCorrectChain, targetChain };
}
