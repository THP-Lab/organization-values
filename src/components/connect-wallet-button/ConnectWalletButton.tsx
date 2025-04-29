"use client";

import { usePrivyAdapter } from "@/hooks/usePrivyAuth";
import ConnectWalletIcon from "../icons/ConnectWalletIcon";
import styles from "./connect-wallet-button.module.scss";
import { DEFAULT_CHAIN_ID } from "@/hooks/usePrivyAuth";

const ConnectWalletButton = () => {
  const { useAccount, useConnect, useDisconnect } = usePrivyAdapter();
  const { isConnected, address } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <button
          className={`${styles.button} ${styles.connected}`}
          onClick={() => disconnect()}
        >
          <ConnectWalletIcon />
          Disconnect ({address?.slice(0, 6)}...{address?.slice(-4)} )
        </button>
      </div>
    );
  }

  return (
    <div>
      {connectors.length > 0 && (
        <button
          className={styles.button}
          onClick={() => connect({ chainId: DEFAULT_CHAIN_ID })}
          disabled={isPending}
        >
          <ConnectWalletIcon />
          {isPending ? (
            "Connecting..."
          ) : (
            <>
              Connect<span>Wallet</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
