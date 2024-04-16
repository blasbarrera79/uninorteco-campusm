import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GradeHeader from "./CardHeader";
import GradeTable from "./GradeTable";

const useStyles = makeStyles({
  CardContent: {
    borderRadius: '0px',
    "&:last-child": {
      paddingBottom: "unset",
    },
  },
});

const GradeCard = ({ gradeName, items }) => {
  const classes = useStyles();

  return (
    <Card className={classes.CardContent}>
      <GradeHeader gradeName={gradeName} />
      <CardContent className={classes.CardContent}>
        <GradeTable items={items} />
      </CardContent>
    </Card>
  );
};

export default GradeCard;
