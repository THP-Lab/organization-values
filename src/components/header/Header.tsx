import Image from "next/image";
import { organizationConfig } from "@/config/organization-config";

import styles from "./header.module.scss";
import ConnectWalletButton from "../connect-wallet-button/ConnectWalletButton";

const Header = () => {
  return (
    <div className={`repel ${styles.header}`}>
      <Image
        className={styles.logo}
        src={organizationConfig.branding.logo.main}
        alt={`${organizationConfig.name} logo`}
        width={162}
        height={35}
      />
      <ConnectWalletButton />
    </div>
  );
};

export default Header;
