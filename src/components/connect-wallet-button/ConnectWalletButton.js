"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import ConnectWalletIcon from "../icons/ConnectWalletIcon";
import styles from "./connect-wallet-button.module.scss";

const ConnectWalletButton = () => {
  const { isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <button className={styles.button} onClick={() => disconnect()}>
          <ConnectWalletIcon />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      {connectors.length > 0 && (
        <button
          className={styles.button}
          onClick={() => connect({ connector: connectors[0] })}
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
