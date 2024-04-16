import React from "react";
import Paper from "@material-ui/core/Paper";

function Box({ children, sx, ...props }) {
  return (
    <Paper
      elevation={0}
      style={{
        backgroundColor: "inherit",
        transition: "none",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default Box;
