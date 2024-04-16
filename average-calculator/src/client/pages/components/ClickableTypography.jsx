import React from "react";
import Typography from "@material-ui/core/Typography";

function ClickableTypography({ message, onClick, sxProps, typographyProps }) {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      onClick={onClick}
      style={{
        cursor: "pointer",
        color: "#026BC8",
        "&:hover": {
          color: "#151618",
        },
        ...sxProps,
      }}
      {...typographyProps}>
      {message}
    </Typography>
  );
}

export default ClickableTypography;
