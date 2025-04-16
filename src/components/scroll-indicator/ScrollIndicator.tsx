import styles from "./scroll-indicator.module.scss";
import Image from "next/image";

import Arrow from "./arrow.svg";

const ScrollIndicator = () => {
  return (
    <div className={styles.scrollIndicator}>
      <i aria-hidden="true">
        <Image
          className={styles.arrow}
          src={Arrow}
          alt="Arrow"
          width={8}
          height={9}
        />
      </i>
      <span>Scroll to explore</span>
    </div>
  );
};

export default ScrollIndicator;
