import ConnectWalletIcon from "../icons/ConnectWalletIcon";
import styles from "./connect-wallet-button.module.scss";

const ConnectWalletButton = () => {
  return (
    <button className={styles.button}>
      <ConnectWalletIcon />
      Connect<span>Wallet</span>
    </button>
  );
};

export default ConnectWalletButton;
