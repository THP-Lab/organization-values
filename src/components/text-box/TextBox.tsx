import styles from "./text-box.module.scss";

const TextBox = ({ children }) => {
  return <div className={styles.textBox}>{children}</div>;
};

export default TextBox;
