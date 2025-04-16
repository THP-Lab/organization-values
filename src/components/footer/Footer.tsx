import Link from "next/link";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";
import styles from "./footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>
          <strong>Values are the foundation of any thriving community.</strong>
          <br />
          <br />
          This platform is a collaborative experiment in collective intelligence,
          enabling communities to surface, discuss and align on shared values
          through transparent and inclusive participation.
          <br />
          <br />
          By making values explicit and measurable, we create a framework for
          better decision-making and stronger collective identity.
          <br />
          <br />
          Have questions or suggestions? Please contact{" "}
          <Link href="mailto:contact@organization-values.com">
            contact@organization-values.com
          </Link>
        </p>
      </div>
      <div className={styles.socialLinks}>
        <h3>Connect With Us</h3>
        <ul role="list">
          <li>
            <a href="https://twitter.com/organization" target="_blank">
              X<ExternalLinkIcon />
            </a>
          </li>
          <li>
            <a href="https://youtube.com/organization" target="_blank">
              Youtube
              <ExternalLinkIcon />
            </a>
          </li>
          <li>
            <a href="https://discord.com/invite/organization" target="_blank">
              Discord
              <ExternalLinkIcon />
            </a>
          </li>
          <li>
            <a href="https://instagram.com/organization" target="_blank">
              Instagram
              <ExternalLinkIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.legalContainer}>
        <ul className={styles.legalLinks} role="list">
          <li>
            <a href="https://organization-values.com/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="https://organization-values.com/terms">Terms of Use</a>
          </li>
        </ul>
        <div className={styles.copyright}>
          &copy; {currentYear} Organization Values. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
