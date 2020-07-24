import React, {FunctionComponent} from "react";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import styles from "../../../styles/v1/theme.module.scss";

type Props = {
  toggleAppDrawer: Function;
};

const AppDrawer: FunctionComponent<Props> = ({toggleAppDrawer}) => {
  const menus = {
    main: [
      {
        label: "GitHub Repo",
        icon: <GitHubIcon classes={{root: styles.drawerSvgIcon}} />,
        link: "https://github.com/owanhunte/covid19caribtracker",
      },
    ],
  };

  return (
    <div
      className={styles.drawerContentWrap}
      role="presentation"
      onClick={toggleAppDrawer(false)}
      onKeyDown={toggleAppDrawer(false)}
    >
      <div className={styles.drawerContentHeader}>Browse</div>
      <List component="div" classes={{root: styles.drawerContentList}}>
        {menus.main.map((item) => (
          <ListItem
            key={item.label}
            component="a"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            dense
            button
          >
            <ListItemIcon classes={{root: styles.drawerItemIcon}}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AppDrawer;
