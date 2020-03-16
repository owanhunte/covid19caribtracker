import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import {
  Home as HomeIcon,
  TableChart as TableChartIcon,
  Description as DescriptionIcon,
  Info as InfoIcon
} from "@material-ui/icons";
import styles from "../../../styles/v1/theme.module.scss";

type Props = {
  toggleAppDrawer: Function;
};

const AppDrawer: FunctionComponent<Props> = ({ toggleAppDrawer }) => {
  const menus = {
    main: [
      {
        label: "Covid-19 Stats",
        icon: <TableChartIcon classes={{ root: styles.drawerSvgIcon }} />,
        link: "/stats"
      },
      {
        label: "Covid-19 News",
        icon: <DescriptionIcon classes={{ root: styles.drawerSvgIcon }} />,
        link: "/news"
      },
      {
        label: "About",
        icon: <InfoIcon classes={{ root: styles.drawerSvgIcon }} />,
        link: "/about"
      }
    ]
  };

  return (
    <div
      className={styles.drawerContentWrap}
      role="presentation"
      onClick={toggleAppDrawer(false)}
      onKeyDown={toggleAppDrawer(false)}
    >
      <div className={styles.drawerContentHeader}>Browse</div>
      <List component="div" classes={{ root: styles.drawerContentList }}>
        <Link to="/">
          <ListItem dense button>
            <ListItemIcon classes={{ root: styles.drawerItemIcon }}>
              <HomeIcon classes={{ root: styles.drawerSvgIcon }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List component="div" classes={{ root: styles.drawerContentList }}>
        {menus.main.map(item => (
          <Link to={item.link} key={item.label}>
            <ListItem dense button>
              <ListItemIcon classes={{ root: styles.drawerItemIcon }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default AppDrawer;
