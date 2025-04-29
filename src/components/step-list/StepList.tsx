import React from 'react';
import { formatCompactNumber } from "@/utils/formatCompactNumber";
import Step from "../step/Step";
import styles from "./step-list.module.scss";
import Carousel from "../carousel/Carousel";

interface Step {
  number: number;
  title: string;
  description: string;
  statImageSrc: string;
  getStats: (valuesCount: number) => string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Propose Values",
    description:
      "Propose a value that you feel is important and / or view the values others have explored",
    statImageSrc: "/images/steps/propose.svg",
    getStats: (valuesCount: number) => `${valuesCount} Values Proposed`,
  },
  {
    number: 2,
    title: "Vote with ETH",
    description:
      "Vote on proposed values by depositing ETH For or Against, and pay a small fee to the value pool",
    statImageSrc: "/images/steps/vote.svg",
    getStats: (valuesCount: number) => `${valuesCount} ETH in votes`,
  },
  {
    number: 3,
    title: "Earn Rewards",
    description:
      "As more people vote on the same value, your shares accrue a portion of their fees",
    statImageSrc: "/images/steps/earn.svg",
    getStats: (valuesCount: number) =>
      `${formatCompactNumber(valuesCount)} in Rewards`,
  },
  {
    number: 4,
    title: "Shape the Future",
    description:
      "Values are ranked by total ETH voted for. You can withdraw your ETH at any time",
    statImageSrc: "/images/steps/shape.svg",
    getStats: (valuesCount: number) =>
      `${formatCompactNumber(valuesCount)}+ Contributors`,
  },
];

interface StepListProps {
  valuesCount: number;
  totalStakedEth: number;
  totalRewards: number;
  totalUsers: number;
}

const StepList: React.FC<StepListProps> = ({
  valuesCount,
  totalStakedEth,
  totalRewards,
  totalUsers,
}) => {
  const stats = [valuesCount, totalStakedEth, totalRewards, totalUsers];
  
  return (
    <>
      <ol className={styles.stepList} role="list">
        {STEPS.map((step, index) => (
          <li key={step.number}>
            <Step
              number={step.number}
              title={step.title}
              description={step.description}
              stats={step.getStats(stats[index])}
              statImageSrc={step.statImageSrc}
            />
          </li>
        ))}
      </ol>
      <Carousel className={styles.carousel}>
        {STEPS.map((step, index) => (
          <div key={step.number} className={styles.carouselItem}>
            <Step
              number={step.number}
              title={step.title}
              description={step.description}
              stats={step.getStats(stats[index])}
              statImageSrc={step.statImageSrc}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default StepList;
