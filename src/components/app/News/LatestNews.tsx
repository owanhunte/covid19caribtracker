import React, { useState, useEffect } from "react";
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
          <Grid item xs={12} sm={6} md={4} xl={3} key={post.uuid}>
            <article>
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${post.image_url})`
                  }}
                ></div>
              </a>
              <h3>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.title}
                </a>
              </h3>
              <p className={styles.summary}>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {post.summary}
                </a>
              </p>
              <div className={styles.postedDate}>
                <EventIcon />
                <span>{format(post.created, "MMM do, yyyy")}</span>
              </div>
            </article>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LatestNews;
