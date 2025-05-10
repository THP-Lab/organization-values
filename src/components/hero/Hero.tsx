import Image from "next/image";
import ScrollIndicator from "../scroll-indicator/ScrollIndicator";
import { organizationConfig } from "@/config/organization-config";

import styles from "./hero.module.scss";

const Hero = () => {
  // Extract necessary elements from the config
  const { hero } = organizationConfig;
  
  return (
    <div className={styles.hero}>
      <Image
        aria-hidden="true"
        src={organizationConfig.branding.hero.backgroundImage}
        alt="hero"
        width={1322}
        height={2328}
        className={styles.heroImage}
        priority // To ensure priority loading
      />
      <h1 className={styles.title}>
        <span>Discover</span>
        <span>{hero.title}</span>
        <span>Values</span>
      </h1>
      <div className={styles.description}>
        <p>{hero.description}</p>
        <div className={styles.scrollIndicator}>
          <ScrollIndicator />
        </div>
      </div>
    </div>
  );
};

export default Hero;
