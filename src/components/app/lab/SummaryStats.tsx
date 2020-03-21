import React, { ChangeEvent, useState, useContext } from "react";
import { AppBar, Tabs, Tab, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import StatsContext from "../../../context/statsContext";
import styles from "../../../styles/v1/theme.module.scss";
import TabPanel from "./TabPanel";
import cx from "classnames";

const a11yProps = (index: any) => {
  return {
    id: `summary-stats-tab-${index}`,
    "aria-controls": `summary-stats-tabpanel-${index}`
  };
};

const useStyles = makeStyles({
  root: {
    margin: "auto"
  }
});

const SummaryStats = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const _statsContext = useContext(StatsContext);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.simpleTabs}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="summary stats tab"
          centered
        >
          <Tab label="Caribbean" {...a11yProps(0)} />
          <Tab label="Global" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        tabPrefix="summary-stats-tab"
        tabPanelPrefix="summary-stats-tabpanel"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={cx(styles.summaryStat, styles.totalCasesStat)}>
              <div className={styles.stat}>
                {_statsContext.totalCaribbeanStats?.cases ? (
                  _statsContext.totalCaribbeanStats?.cases.toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>total cases</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.summaryStat}>
              <div className={styles.stat}>
                {_statsContext.totalCaribbeanStats?.deaths ? (
                  _statsContext.totalCaribbeanStats?.deaths.toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>deceased</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.summaryStat}>
              <div className={styles.stat}>
                {_statsContext.totalCaribbeanStats?.recovered ? (
                  _statsContext.totalCaribbeanStats?.recovered.toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>recovered</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.summaryStat}>
              <div className={styles.stat}>
                {_statsContext.totalCaribbeanStats?.cases ? (
                  (
                    _statsContext.totalCaribbeanStats?.cases -
                    _statsContext.totalCaribbeanStats?.deaths -
                    _statsContext.totalCaribbeanStats?.recovered
                  ).toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>active</div>
            </div>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        tabPrefix="summary-stats-tab"
        tabPanelPrefix="summary-stats-tabpanel"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={cx(styles.summaryStat, styles.totalCasesStat)}>
              <div className={styles.stat}>
                {_statsContext.totalStats?.cases ? (
                  _statsContext.totalStats?.cases.toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>total cases</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.summaryStat}>
              <div className={styles.stat}>
                {_statsContext.totalStats?.deaths ? (
                  _statsContext.totalStats?.deaths.toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>deceased</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.summaryStat}>
              <div className={styles.stat}>
                {_statsContext.totalStats?.recovered ? (
                  _statsContext.totalStats?.recovered.toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>recovered</div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.summaryStat}>
              <div className={styles.stat}>
                {_statsContext.totalStats?.cases ? (
                  (
                    _statsContext.totalStats?.cases -
                    _statsContext.totalStats?.deaths -
                    _statsContext.totalStats?.recovered
                  ).toLocaleString()
                ) : (
                  <Skeleton
                    component="div"
                    variant="text"
                    animation="wave"
                    width="80%"
                    classes={{
                      root: classes.root
                    }}
                  />
                )}
              </div>
              <div className={styles.label}>active</div>
            </div>
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
};

export default SummaryStats;
