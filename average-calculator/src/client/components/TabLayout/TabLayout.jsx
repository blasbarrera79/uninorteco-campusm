import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  tabLayout: {
    maxWidth: "1000px",
    width: "100%",
    marginBottom: "1rem",
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
  },
});

export function TabLayout({ onIndexChange, index, tabs, children }) {
  const classes = useStyles();

  const handleTabChange = (event, newIndex) => {
    onIndexChange(newIndex);
  };
  
  return (
    <Paper className={classes.tabLayout}>
      <Tabs
        value={index}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="tab-layout">
        {tabs.map((tab, tabIndex) => (
          <Tab
            key={tab}
            label={tab}
            value={tabIndex}
          />
        ))}
      </Tabs>
      <div className={classes.tabContent}>{children}</div>
    </Paper>
  );
}
