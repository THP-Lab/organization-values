import React from "react";
import Link from "next/link";
import ExternalLinkIcon from "../icons/ExternalLinkIcon";
import styles from "./footer.module.scss";
import { organizationConfig } from "@/config/organization-config";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { footer, externalLinks } = organizationConfig;
  
  // Définir les réseaux sociaux à afficher avec leurs noms d'affichage
  const socialMediaLinks = [
    { key: 'twitter', name: 'X', url: externalLinks.social.twitter },
    { key: 'youtube', name: 'Youtube', url: externalLinks.social.youtube },
    { key: 'discord', name: 'Discord', url: externalLinks.social.discord },
    { key: 'instagram', name: 'Instagram', url: externalLinks.social.instagram }
  ];
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>
          <strong>{footer.title}</strong>
          <br />
          <br />
          {footer.description.map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              <br />
              <br />
            </React.Fragment>
          ))}
          Have questions or suggestions? Please contact{" "}
          <Link href={`mailto:${externalLinks.contactEmail}`}>
            {externalLinks.contactEmail}
          </Link>
        </p>
      </div>
      <div className={styles.socialLinks}>
        <h3>{footer.connectTitle}</h3>
        <ul role="list">
          {socialMediaLinks.map((link) => (
            <li key={link.key}>
              <a href={link.url} target="_blank">
                {link.name}<ExternalLinkIcon />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.legalContainer}>
        <ul className={styles.legalLinks} role="list">
          <li>
            <a href={externalLinks.legal.privacy}>Privacy Policy</a>
          </li>
          <li>
            <a href={externalLinks.legal.terms}>Terms of Use</a>
          </li>
        </ul>
        <div className={styles.copyright}>
          &copy; {currentYear} {footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
