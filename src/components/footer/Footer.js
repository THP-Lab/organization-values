import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>A collaboration with Consensys and Intuition</p>
        <p>
          Ipsum fermentum lorem a nunc et dictum mauris dolor. Accumsan in velit
          aliquam aliquam congue dolor sed id.
        </p>
      </div>
      <div className={styles.socialLinks}>
        <h3>Social</h3>
        <ul role="list">
          <li>
            <a href="#" target="_blank">
              X
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Youtube
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Discord
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <ul className={styles.legalLinks} role="list">
        <li>
          <a href="#" target="_blank">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            Terms of Use
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            Manage Cookies
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
