import React, { FunctionComponent } from "react";
import AppHeader from "./AppHeader";
import styles from "../../../styles/v1/theme.module.scss";
import cx from "classnames";

type Props = {
  children: React.ReactElement | Array<React.ReactElement>;
};

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={cx(styles.appRoot, styles.isFullScreen)}>
      <AppHeader />
      <main className={styles.appMain}>{children}</main>
    </div>
  );
};

export default Layout;
