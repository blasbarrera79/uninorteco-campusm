import React from "react";
import Paper from "@material-ui/core/Paper";

function BaseCard({ children, sx, ...props }) {
  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
        alignItems: "center",
        gap: "1rem",
        borderRadius: "0.5rem",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default BaseCard;
