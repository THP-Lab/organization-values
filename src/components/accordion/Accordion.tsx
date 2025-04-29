"use client";
import { useState, useId } from "react";
import styles from "./accordion.module.scss";
import CaretDownIcon from "../icons/CaretDownIcon";

interface AccordionItem {
  title?: string;
  content?: React.ReactNode;
  question?: string;
  answer?: React.ReactNode;
  id?: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const accordionId = useId();

  const toggleItem = (index: number) => {
    setOpenIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  return (
    <div id={accordionId} className={styles.accordion}>
      {items.map((item, index) => {
        const headerId = `${accordionId}-header-${index}`;
        const panelId = `${accordionId}-panel-${index}`;
        const isExpanded = openIndexes.includes(index);

        return (
          <div
            key={item.id || `${accordionId}-${index}`}
            className={`${styles.item} ${isExpanded ? styles.open : ""}`}
          >
            <button
              type="button"
              className={styles.trigger}
              onClick={() => toggleItem(index)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              id={headerId}
            >
              <span className={styles.title}>{item.title || item.question}</span>
              <i className={styles.icon} aria-hidden="true">
                <CaretDownIcon />
              </i>
            </button>
            <div
              className={styles.content}
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isExpanded}
            >
              <div className={styles.inner}>{item.content || item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
