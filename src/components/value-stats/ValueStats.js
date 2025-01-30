import UserIcon from "../icons/UserIcon";

import styles from "./value-stats.module.scss";

const ValueStats = ({ totalAmount, totalUsers, large = false }) => {
  return (
    <div className={`${styles.stats} ${large ? styles.large : ""}`}>
      <p className={styles.totalAmount}>{totalAmount.toLocaleString()} ETH</p>
      <p className={styles.totalUsers}>
        <UserIcon />
        {totalUsers.toLocaleString()}
      </p>
    </div>
  );
};

export default ValueStats;
