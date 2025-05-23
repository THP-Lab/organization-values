import Image from "next/image";
import styles from "./step.module.scss";

const Step = ({ number, title, description, stats, statImageSrc }) => {
  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number;
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
