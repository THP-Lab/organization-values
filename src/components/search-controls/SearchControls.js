import styles from "./search-controls.module.scss";

const SearchControls = () => {
  return (
    <div className={styles.controls}>
      <div className={styles.orderby}>
        <label htmlFor="rankSelect">Ranked by</label>
        <select id="rankSelect">
          <option value="supporters">Most Support</option>
          <option value="stake">Most Staked</option>
          <option value="newest">Most Recent</option>
          <option value="oldest">Least Recent</option>
        </select>
      </div>
      <div className={styles.involved}>
        <label className={styles.checkbox}>
          <input type="checkbox" />
          <span>Show only values I&apos;ve voted on</span>
        </label>
      </div>
    </div>
  );
};

export default SearchControls;
