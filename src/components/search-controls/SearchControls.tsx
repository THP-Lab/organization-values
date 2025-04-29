import React from 'react';
import styles from "./search-controls.module.scss";

interface SearchControlsProps {
  sortValue: string;
  setSortValue: (value: string) => void;
  involved: boolean;
  setInvolved: (value: boolean) => void;
}

const SearchControls = ({ 
  sortValue, 
  setSortValue, 
  involved, 
  setInvolved 
}: SearchControlsProps) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };

  const handleInvolvedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvolved(e.target.checked);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.sortControl}>
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortValue}
          onChange={handleSortChange}
          className={styles.select}
        >
          <option value="mostStaked">Most staked</option>
          <option value="newest">Newest</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>
      <div className={styles.filterControl}>
        <label htmlFor="involved-checkbox" className={styles.checkboxLabel}>
          <input
            id="involved-checkbox"
            type="checkbox"
            checked={involved}
            onChange={handleInvolvedChange}
            className={styles.checkbox}
          />
          <span>Show only values I've voted on</span>
        </label>
      </div>
    </div>
  );
};

export default SearchControls;
