/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from "react";
import { CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  CardHeader: {
    backgroundColor: "#6FA1D2",
    color: "#FFFFFF",
  },
});

const GradeHeader = ({ gradeName }) => {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.CardHeader}
      title={gradeName}
    />
  );
};

export default GradeHeader;
