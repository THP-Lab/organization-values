import UserIcon from "../icons/UserIcon";

import styles from "./value-stats.module.scss";

const ValueStats = ({
  totalAmount,
  totalAmountFor,
  totalAmountAgainst,
  totalUsers,
  large = false,
  greenBackground = false,
}) => {
  return (
    <div
      className={`
        ${styles.stats} 
        ${large ? styles.large : ""} 
        ${greenBackground ? styles.greenBackground : ""}`}
    >
      <div className={styles.totalAmountContainer}>
        <p className={styles.totalAmount}>{totalAmount.toLocaleString()} ETH</p>
        <table className={styles.totalAmountTable}>
          <tbody>
            <tr>
              <td>
                <span>For</span>
              </td>
              <td className={styles.totalAmountFor}>
                {totalAmountFor.toLocaleString()} ETH
              </td>
            </tr>
            <tr>
              <td>
                <span>Against</span>
              </td>
              <td className={styles.totalAmountAgainst}>
                {totalAmountAgainst.toLocaleString()} ETH
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={styles.totalUsers}>
        <UserIcon />
        {totalUsers.toLocaleString()}
      </p>
    </div>
  );
};

export default ValueStats;
