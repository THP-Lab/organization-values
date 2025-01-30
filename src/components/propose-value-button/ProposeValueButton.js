import PlusIcon from "../icons/PlusIcon";
import styles from "./propose-value-button.module.scss";

const ProposeValueButton = () => {
  return (
    <button className={styles.button}>
      <PlusIcon />
      Propose a Value
    </button>
  );
};

export default ProposeValueButton;
