import React from "react";
import Paper from "@material-ui/core/Paper";

function Stack({ children, sx, ...props }) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "inherit",
        transition: "none",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default Stack;
