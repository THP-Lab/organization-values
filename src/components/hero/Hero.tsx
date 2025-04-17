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
        <span>Discover Our</span>
        <span>Collective</span>
        <span>Values</span>
      </h1>
      <div className={styles.description}>
        <p>
          Join a vibrant community shaping its future through open dialogue 
          and collaborative decision-making. Together, we'll define the 
          principles that unite and guide us.
        </p>
        <div className={styles.scrollIndicator}>
          <ScrollIndicator />
        </div>
      </div>
    </div>
  );
};

export default Hero;
