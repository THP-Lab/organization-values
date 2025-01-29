import Image from "next/image";
import logoImage from "./logo.svg";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={`repel ${styles.header}`}>
      <Image
        className={styles.logo}
        src={logoImage}
        alt="Consensys logo"
        width={162}
        height={35}
      />
      <button>Connect Wallet</button>
    </div>
  );
};

export default Header;
