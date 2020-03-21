import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import format from "date-fns/format";
import { getLatestNews, NewsPost } from "../../../utils/dataFetchers";
import styles from "../../../styles/v1/theme.module.scss";
import ms from "ms";

const LatestNews = () => {
  const [posts, setPosts] = useState<{
    data: NewsPost[];
    cacheExpiresOn?: number;
  }>({
    data: [],
    cacheExpiresOn: Date.now()
  });

  useEffect(() => {
    (async () => {
      let refreshData = false;
      try {
        if (posts.data.length) {
          // TODO: Check if the data cache stored in state has expired.
        } else {
          refreshData = true;
        }

        if (refreshData) {
          const latestNews = await getLatestNews();
          setPosts({
            data: latestNews,
            cacheExpiresOn: Date.now() + parseInt(ms("15m").toString())
          });
        }
      } catch (error) {}
    })();
  }, [posts]);

  return (
    <div className={styles.latestNews}>
      <h2 className={styles.justifyCenter}>Latest Covid-19 Caribbean News</h2>
      <Grid container spacing={4}>
        {posts.data.map(post => (
          <Grid item xs={12} sm={4} md={4} key={post.uuid}>
            <article>
              <Link to={post.path}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${post.image_url})`
                  }}
                ></div>
              </Link>
              <h3>
                <Link to={post.path}>{post.title}</Link>
              </h3>
              <p className={styles.summary}>
                <Link to={post.path}>{post.summary}</Link>
              </p>
              <div className={styles.postedDate}>
                <EventIcon />
                <span>{format(post.created, "MMM do, yyyy")}</span>
              </div>
            </article>
          </Grid>
        ))}
      </Grid>
      <div className={styles.viewAllLink}>
        <Link to="/news">View More</Link>
      </div>
    </div>
  );
};

export default LatestNews;
