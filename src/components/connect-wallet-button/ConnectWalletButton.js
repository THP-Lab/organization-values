"use client";

import { useAccount, useDisconnect, useConnect } from "wagmi";
import ConnectWalletIcon from "../icons/ConnectWalletIcon";
import styles from "./connect-wallet-button.module.scss";
import { useEffect, useState } from "react";

const ConnectWalletButton = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const connector = connectors[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      (async () => {
        const provider = await connector.getProvider();
        setReady(!!provider);
      })();
    }
  }, [connector, mounted]);

  if (!mounted) {
    return null;
  }

  if (!address) {
    return (
      <div>
        <button
          className={styles.button}
          disabled={!ready}
          onClick={() => connect({ connector })}
        >
          <ConnectWalletIcon />
          Connect<span>Wallet</span>
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className={styles.button} onClick={() => disconnect()}>
        <ConnectWalletIcon />
        Disconnect
      </button>
    </div>
  );
};

export default ConnectWalletButton;
