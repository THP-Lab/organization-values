import UserIcon from "../icons/UserIcon";
import ValueActions from "../value-actions/ValueActions";
import ValueStats from "../value-stats/ValueStats";

import styles from "./featured-value.module.scss";

const FeaturedValue = ({
  color,
  title,
  description,
  totalAmount,
  totalUsers,
}) => {
  const colorClass = styles[color] ? styles[color] : "";

  return (
    <div className={`${styles.featuredValue} ${colorClass}`}>
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.valueStats}>
          <ValueStats totalAmount={totalAmount} totalUsers={totalUsers} />
        </div>
        <ValueActions />
      </div>
      <div className={styles.sidebar}>
        <ValueStats totalAmount={totalAmount} totalUsers={totalUsers} large={true} />
      </div>
    </div>
  );
};

export default FeaturedValue;
