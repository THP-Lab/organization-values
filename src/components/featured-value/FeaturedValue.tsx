import { ReactNode } from 'react';
import ValueActions from "../value-actions/ValueActions";
import ValueStats from "../value-stats/ValueStats";

import styles from "./featured-value.module.scss";

interface FeaturedValueProps {
  valueId: string | number;
  vaultId: string | number;
  counterVaultId: string | number;
  title: string;
  description: string;
  totalAmount: string;
  totalAmountFor: string;
  totalAmountAgainst: string;
  totalUsers: number;
}

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
}: FeaturedValueProps) => {
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
            greenBackground={true}
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
