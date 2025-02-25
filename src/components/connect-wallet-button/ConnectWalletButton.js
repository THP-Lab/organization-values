"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import ConnectWalletIcon from "../icons/ConnectWalletIcon";
import styles from "./connect-wallet-button.module.scss";

const ConnectWalletButton = () => {
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
          onClick={() => alert("This feature is currently under maintenance. Please try again later.")}
          // onClick={() => connect({ connector: connectors[0] })}
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
