import React, { ReactNode } from 'react';
import styles from "./text-box.module.scss";

interface TextBoxProps {
  children: ReactNode;
}

const TextBox: React.FC<TextBoxProps> = ({ children }) => {
  return <div className={styles.textBox}>{children}</div>;
};

export default TextBox;
