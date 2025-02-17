import Link from "next/link";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>
          A collaboration between{" "}
          <Link href="https://consensys.io" target="_blank">
            Consensys
          </Link>{" "}
          and{" "}
          <Link href="https://www.intuition.systems/" target="_blank">
            Intuition
          </Link>
          <br />
          <br />
          This is an experimental project to explore how the Ethereum community
          can surface and align on the values that matter the most, in a
          transparent and inclusive way.
          <br />
          <br />
          Please contact{" "}
          <Link href="mailto:community-values-support@consensys.io">
            community-values-support@consensys.io
          </Link>{" "}
          for more info.
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
