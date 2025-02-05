"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import ConnectWalletIcon from "../icons/ConnectWalletIcon";
import styles from "./connect-wallet-button.module.scss";

const ConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
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
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className={styles.button}
          onClick={() => connect({ connector })}
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
      ))}
    </div>
  );
};

export default ConnectWalletButton;
