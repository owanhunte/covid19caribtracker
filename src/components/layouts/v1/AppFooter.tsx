import React from "react";
import styles from "../../../styles/v1/theme.module.scss";
import cx from "classnames";

const AppFooter = () => {
  return (
    <footer className={styles.appFooter}>
      <div className={cx(styles.caption, styles.footerDiv1)}>
        <span>
          &copy; {new Date().getUTCFullYear()}. This web app was created by{" "}
          <a href="https://owanhunte.com" target="_blank" rel="noopener noreferrer">
            Owan Hunte
          </a>
          , a web developer from <em>Barbados</em>.
        </span>
      </div>
      <div className={cx(styles.caption, styles.footerDiv2)}>
        COVID-19 coronavirus stats for the Caribbean region.
      </div>
    </footer>
  );
};

export default AppFooter;
