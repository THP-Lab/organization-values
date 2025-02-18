import ValueActions from "../value-actions/ValueActions";
import ValueStats from "../value-stats/ValueStats";

import styles from "./featured-value.module.scss";

const FeaturedValue = ({
  valueId,
  vaultId,
  counterVaultId,
  title,
  description,
  totalAmount,
  totalAmountFor,
  totalAmountAgainst,
  totalUsers,
}) => {
  return (
    <div className={styles.featuredValue}>
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.valueStats}>
          <ValueStats
            totalAmount={totalAmount}
            totalAmountFor={totalAmountFor}
            totalAmountAgainst={totalAmountAgainst}
            totalUsers={totalUsers}
          />
        </div>
        <ValueActions
          valueId={valueId}
          name={title}
          vaultId={vaultId}
          counterVaultId={counterVaultId}
        />
      </div>
      <div className={styles.sidebar}>
        <ValueStats
          totalAmount={totalAmount}
          totalAmountFor={totalAmountFor}
          totalAmountAgainst={totalAmountAgainst}
          totalUsers={totalUsers}
          large={true}
        />
      </div>
    </div>
  );
};

export default FeaturedValue;
