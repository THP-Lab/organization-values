import ExternalLinkIcon from "../icons/ExternalLinkIcon";
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
            <a href="https://twitter.com/consensys" target="_blank">
              X<ExternalLinkIcon />
            </a>
          </li>
          <li>
            <a href="https://youtube.com/consensys" target="_blank">
              Youtube
              <ExternalLinkIcon />
            </a>
          </li>
          <li>
            <a href="https://discord.com/invite/consensys" target="_blank">
              Discord
              <ExternalLinkIcon />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/consensysofficial" target="_blank">
              Instagram
              <ExternalLinkIcon />
            </a>
          </li>
        </ul>
      </div>
      <ul className={styles.legalLinks} role="list">
        <li>
          <a href="https://consensys.io/privacy-notice">Privacy Policy</a>
        </li>
        <li>
          <a href="https://consensys.io/terms-of-use">Terms of Use</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
