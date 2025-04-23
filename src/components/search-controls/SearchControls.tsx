import styles from "./search-controls.module.scss";

const SearchControls = ({ sortValue, setSortValue, involved, setInvolved }) => {
  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };

  const handleFilterChange = (e) => {
    setInvolved(e.target.checked);
  };

  return (
    <div className={styles.controls}>
      <div className={styles.orderby}>
        <label htmlFor="rankSelect">Ranked by</label>
        <div className={styles.selectWrapper}>
          <select id="rankSelect" value={sortValue} onChange={handleSortChange}>
            <option value="upvotes">Most Upvoted</option>
            <option value="downvotes">Most Downvoted</option>
            <option value="newest">Most Recent</option>
            <option value="oldest">Least Recent</option>
          </select>
        </div>
      </div>
      <div className={styles.involved}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={involved}
            onChange={handleFilterChange}
          />
          <span>Show only values I&apos;ve voted on</span>
        </label>
      </div>
    </div>
  );
};

export default SearchControls;
