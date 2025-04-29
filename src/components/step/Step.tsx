import React from 'react';
import Image from "next/image";
import styles from "./step.module.scss";

interface StepProps {
  number: number;
  title: string;
  description: string;
  stats: string;
  statImageSrc: string;
}

const Step: React.FC<StepProps> = ({ 
  number, 
  title, 
  description, 
  stats, 
  statImageSrc 
}) => {
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : String(num);
  };

  return (
    <div className={styles.step}>
      <div className={styles.number} aria-label={`Step ${number}`}>
        {formatNumber(number)}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {/* TODO: Add stats back in */}
        {/* <div className={styles.stats}>
          <Image
            src={statImageSrc}
            alt={`${title} stats`}
            width={24}
            height={25}
          />
          <span className={styles.statsText}>{stats}</span>
        </div> */}
      </div>
    </div>
  );
};

export default Step;
