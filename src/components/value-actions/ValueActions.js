import ForumIcon from "../icons/ForumIcon";
import ShareIcon from "../icons/ShareIcon";
import VoteAgainstIcon from "../icons/VoteAgainstIcon";
import VoteForIcon from "../icons/VoteForIcon";
import styles from "./value-actions.module.scss";
const ValueActions = () => {
  return (
    <div className={styles.actions}>
      <button className={styles.voteButton}>
        <VoteForIcon />
        Vote for
      </button>
      <button className={styles.voteButton}>
        <VoteAgainstIcon />
        Vote against
      </button>
      <button className={styles.withdrawButton}>Withdraw</button>
      <div className={styles.socialActions}>
        <a href="https://www.kialo-edu.com/" target="_blank">
          <ForumIcon />
        </a>
        <a
          href="https://x.com/intent/tweet?url=https%3A%2F%2Fethereum-values.consensys.io%2F"
          target="_blank"
        >
          <ShareIcon />
        </a>
      </div>
    </div>
  );
};

export default ValueActions;
