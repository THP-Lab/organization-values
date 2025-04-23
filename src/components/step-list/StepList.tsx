import { formatCompactNumber } from "@/utils/formatCompactNumber";
import Step from "../step/Step";
import styles from "./step-list.module.scss";
import Carousel from "../carousel/Carousel";
import { organizationConfig } from "@/config/organization-config";

const StepList = ({
  valuesCount,
  totalStakedEth,
  totalRewards,
  totalUsers,
}) => {
  // Récupérer les étapes depuis la configuration
  const STEPS = organizationConfig.sections.steps;
  
  // Fonction pour obtenir la valeur statistique appropriée pour chaque étape
  const getStepStat = (step, index) => {
    const statValues = [
      valuesCount,
      totalStakedEth,
      totalRewards,
      totalUsers
    ];
    
    // Utiliser la fonction getStatText ou une valeur par défaut
    return step.getStatText ? 
      step.getStatText(statValues[index] || 0) : 
      `${statValues[index] || 0}`;
  };

  return (
    <>
      <ol className={styles.stepList} role="list">
        {STEPS.map((step, index) => (
          <li key={step.number}>
            <Step
              number={step.number}
              title={step.title}
              description={step.description}
              stats={getStepStat(step, index)}
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
              stats={getStepStat(step, index)}
              statImageSrc={step.statImageSrc}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default StepList;
