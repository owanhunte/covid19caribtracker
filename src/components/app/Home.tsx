import React from "react";
import { Grid } from "@material-ui/core";
import TabularStats from "./lab/TabularStats";
import styles from "../../styles/v1/theme.module.scss";
import cx from "classnames";

const Home = () => {
  return (
    <section className={cx(styles.contentPad, styles.contentTop)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <TabularStats />
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
    </section>
  );
};

export default Home;
