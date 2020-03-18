import React from "react";
import { Grid } from "@material-ui/core";
import TabularStats from "./lab/TabularStats";
import SummaryStats from "./lab/SummaryStats";
import CountriesWithoutCases from "./lab/CountriesWithoutCases";
import styles from "../../styles/v1/theme.module.scss";
import cx from "classnames";

const Home = () => {
  return (
    <React.Fragment>
      <section className={cx(styles.contentPad, styles.contentTop)}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <TabularStats />
          </Grid>
          <Grid item sm={12} md={4}>
            <h2 className={styles.justifyCenter}>Data Summary</h2>
            <div className={styles.simpleTabs}>
              <SummaryStats />
            </div>
            <div className={styles.updateNote}>
              Note: Not all countries are updated at the same time
            </div>
          </Grid>
        </Grid>
      </section>

      <section className={cx(styles.contentPad, styles.sectionLight)}>
        <CountriesWithoutCases />
      </section>
    </React.Fragment>
  );
};

export default Home;
