"use client";
import React, { useState, useRef, useEffect } from 'react';
import CaretDownIcon from "../icons/CaretDownIcon";
import ValueActions from "../value-actions/ValueActions";
import ValueStats from "../value-stats/ValueStats";
import styles from "./value-card.module.scss";

interface ValueCardProps {
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

const ValueCard: React.FC<ValueCardProps> = ({
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
  const descriptionRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [actionsHeight, setActionsHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (descriptionRef.current) {
        setDescriptionHeight(descriptionRef.current.scrollHeight);
      }
      
      if (actionsRef.current) {
        setActionsHeight(actionsRef.current.scrollHeight);
      }
    };
    
    updateHeights();
    
    const resizeObserver = new ResizeObserver(updateHeights);
    
    if (descriptionRef.current) {
      resizeObserver.observe(descriptionRef.current);
    }
    
    if (actionsRef.current) {
      resizeObserver.observe(actionsRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  interface CustomCSSProperties extends React.CSSProperties {
    "--expanded-description-height"?: string;
    "--expanded-actions-height"?: string;
  }

  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
      style={{
        "--expanded-description-height": `${descriptionHeight}px`,
        "--expanded-actions-height": `${actionsHeight}px`,
      } as CustomCSSProperties}
    >
      <button
        className={styles.expandButton}
        onClick={toggleExpand}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? "Collapse card" : "Expand card"}
      >
        <CaretDownIcon />
      </button>
      <h3 className={styles.title}>
        {title}
      </h3>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Staked</span>
          <span className={styles.statValue}>{totalAmount} ETH</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>For</span>
          <span className={styles.statValue}>{totalAmountFor} ETH</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Against</span>
          <span className={styles.statValue}>{totalAmountAgainst} ETH</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Users</span>
          <span className={styles.statValue}>{totalUsers}</span>
        </div>
      </div>
      <div className={styles.description} ref={descriptionRef}>
        <p>{description}</p>
      </div>
      <div className={styles.valueStats}>
        <ValueStats
          totalAmount={totalAmount}
          totalAmountFor={totalAmountFor}
          totalAmountAgainst={totalAmountAgainst}
          totalUsers={totalUsers}
        />
      </div>
      <div className={styles.actions} ref={actionsRef}>
        <ValueActions
          valueId={valueId}
          name={title}
          vaultId={vaultId}
          counterVaultId={counterVaultId}
          hoverColor="accent"
        />
      </div>
    </div>
  );
};

export default ValueCard;
