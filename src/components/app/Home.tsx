import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import TabularStats from "./lab/TabularStats";
import SummaryStats from "./lab/SummaryStats";
import CountriesWithoutCases from "./lab/CountriesWithoutCases";
import LatestNews from "./News/LatestNews";
import StatsContext from "../../context/statsContext";
import styles from "../../styles/v1/theme.module.scss";
import cx from "classnames";

const Home = () => {
  const _statsContext = useContext(StatsContext);

  return (
    <React.Fragment>
      <section className={cx(styles.contentPad, styles.contentTop)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <TabularStats />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <h2 className={styles.justifyCenter}>Data Summary</h2>
            <div className={styles.simpleTabs}>
              <SummaryStats />
            </div>
            <div className={styles.updateNote}>
              <p>
                <strong>Data Source:&nbsp;&nbsp;</strong>
                <a
                  href="https://github.com/javieraviles/covidAPI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  javieraviles/covidAPI
                </a>
                <br />(
                <em>Note: Not all countries may be updated at the same time</em>
                )
              </p>
              <p style={{ marginBottom: 0 }}>
                Last updated:&nbsp;&nbsp;
                {_statsContext.lastUpdated &&
                  `${formatDistanceToNow(_statsContext.lastUpdated)} ago`}
              </p>
            </div>
          </Grid>
        </Grid>
      </section>

      {_statsContext.countriesWithNoConfirmedCases?.length && (
        <CountriesWithoutCases />
      )}

      <section className={cx(styles.contentPad, styles.sectionNormal)}>
        <LatestNews />
      </section>
    </React.Fragment>
  );
};

export default Home;
