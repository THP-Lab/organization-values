"use client";
import { useState, useEffect, useRef } from "react";
import CaretDownIcon from "../icons/CaretDownIcon";
import ValueActions from "../value-actions/ValueActions";
import ValueStats from "../value-stats/ValueStats";
import styles from "./value-card.module.scss";

const ValueCard = ({
  valueId,
  vaultId,
  counterVaultId,
  title,
  description,
  totalAmount,
  totalUsers,
  forumPost,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [actionsHeight, setActionsHeight] = useState(0);

  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const updateHeights = () => {
      setDescriptionHeight(descriptionRef.current.scrollHeight);
      setActionsHeight(actionsRef.current.scrollHeight);
    };
    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
      style={{
        "--expanded-description-height": `${descriptionHeight}px`,
        "--expanded-actions-height": `${actionsHeight}px`,
      }}
    >
      <button
        className={styles.expandButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CaretDownIcon />
      </button>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description} ref={descriptionRef}>
        {description}
      </p>
      <div className={styles.valueStats}>
        <ValueStats totalAmount={totalAmount} totalUsers={totalUsers} />
      </div>
      <div className={styles.actions} ref={actionsRef}>
        <ValueActions
          valueId={valueId}
          name={title}
          vaultId={vaultId}
          counterVaultId={counterVaultId}
          hoverColor="accent"
          forumPost={forumPost}
        />
      </div>
    </div>
  );
};

export default ValueCard;
