/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GradeHeader from "./CardHeader";
import GradeTable from "./GradeTable";

const useStyles = makeStyles({
  CardContent: {
    padding: "0 2em",
    "&:last-child": {
      paddingBottom: "unset",
    },
  },
});

const GradeCard = ({ gradeName, items }) => {
  const classes = useStyles();

  return (
    <Card style={{ marginTop: "1em" }}>
      <GradeHeader gradeName={gradeName} />
      <CardContent className={classes.CardContent}>
        <GradeTable items={items} />
      </CardContent>
    </Card>
  );
};

export default GradeCard;
