import React from "react";
import { Typography, Box } from "@material-ui/core";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  tabPrefix: string;
  tabPanelPrefix: string;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, tabPrefix, tabPanelPrefix, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`${tabPanelPrefix}-${index}`}
      aria-labelledby={`${tabPrefix}-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
};

export default TabPanel;
