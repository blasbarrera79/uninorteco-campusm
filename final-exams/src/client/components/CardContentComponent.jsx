/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CardContentComponent = ({ title, hour, teacher, place }) => {
  const classes = useStyles();

  return (
    <CardContent>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {hour}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {teacher}
      </Typography>
      <Typography variant="body2" component="p">
        {place}
      </Typography>
    </CardContent>
  );
};

export default CardContentComponent;
