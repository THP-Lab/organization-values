import Image from "next/image";
import ScrollIndicator from "../scroll-indicator/ScrollIndicator";

import heroImage from "./hero.png";

import styles from "./hero.module.scss";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Image
        aria-hidden="true"
        src={heroImage}
        alt="hero"
        width={1322}
        height={2328}
        className={styles.heroImage}
      />
      <h1 className={styles.title}>
        <span>What are</span>
        <span>Ethereum&apos;s</span>
        <span>Values?</span>
      </h1>
      <div className={styles.description}>
        <p>
          Join the community in an experiment to collectively align on the
          values at the core of Ethereum.
        </p>
        <div className={styles.scrollIndicator}>
          <ScrollIndicator />
        </div>
      </div>
    </div>
  );
};

export default Hero;
