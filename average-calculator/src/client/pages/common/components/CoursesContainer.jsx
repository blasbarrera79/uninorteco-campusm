import React from "react";
import { Box } from "../../../components/Box";
import { withStyles } from "@ellucian/react-design-system/core/styles";

export function CoursesContainer({ children, sxProps, classes }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        ...sxProps,
      }}
      className={classes.root}
    >
      {children}
    </Box>
  );
}

const styles = (theme) => ({
  root: {
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
    },
  },
});

export default withStyles(styles)(CoursesContainer);
