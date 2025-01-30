import ProposeValueButton from "../propose-value-button/ProposeValueButton";
import SearchControls from "../search-controls/SearchControls";
import styles from "./value-listing.module.scss";

const ValueListing = () => {
  return (
    <div className={styles.listing}>
      <div className={styles.toolbar}>
        <SearchControls />
        <div>
          <ProposeValueButton />
        </div>
      </div>
    </div>
  );
};

export default ValueListing;
