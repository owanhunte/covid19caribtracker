import React, {useState, KeyboardEvent, MouseEvent} from "react";
import {Link} from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  useMediaQuery,
} from "@material-ui/core";
import {Menu as MenuIcon, GitHub as GitHubIcon} from "@material-ui/icons";
import {useTheme} from "@material-ui/core/styles";
import styles from "../../../styles/v1/theme.module.scss";
import AppDrawer from "./AppDrawer";

const AppHeader = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [drawerState, setDrawerState] = useState({
    appDrawer: false,
  });

  const toggleDrawer = (val: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" || (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState({...drawerState, appDrawer: val});
  };

  return (
    <div className={styles.appHeader}>
      <AppBar elevation={0} position="fixed" classes={{root: styles.appBar}}>
        <Toolbar classes={{root: styles.appBarToolbar}}>
          <h1 className={styles.siteName}>
            <Link to="/">Covid-19 Caribbean Tracker</Link>
          </h1>
          {matches ? (
            <React.Fragment>
              <a
                className={styles.navLink}
                href="https://github.com/owanhunte/covid19caribtracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button color="inherit" startIcon={<GitHubIcon />}>
                  GitHub Repo
                </Button>
              </a>
            </React.Fragment>
          ) : (
            <div className={styles.menuButton}>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="open nav drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {!matches && (
        <Drawer
          anchor="right"
          open={drawerState.appDrawer}
          onClose={toggleDrawer(false)}
          classes={{paper: styles.drawerPaper}}
        >
          <AppDrawer toggleAppDrawer={toggleDrawer} />
        </Drawer>
      )}
    </div>
  );
};

export default AppHeader;
