import React from "react";
import { TextField, makeStyles } from "@ellucian/react-design-system/core";

const useStyles = makeStyles(() => ({
  root: {
    "& .hedtech-number-input": {
      width: "100%",
    },
  },
}));

export function GradeTextField({
  onGradeChange,
  value,
  presicion = 2,
  ...props
}) {
  const classes = useStyles();

  // If we use onChange, we perform the average calculation on every keystroke
  // if the user leaves the input empty, we get the last valid value
  const handleChange = (event) => {
    const data = event.target.value;
    const parsedData = parseFloat(data);

    if (!Number.isNaN(parsedData)) {
      onGradeChange(parsedData);
    }
  };

  // If we use onBlur, we perform the average calculation only when the user leaves the input
  // if the user leaves the input empty, we get the value before focusing the input
  // but if the user press enter, we get the last valid value

  /* const onInputOut = (e) => {
    const data = e.target.value;
    const parsedData = parseFloat(data);

    if (!Number.isNaN(parsedData)) {
      onGradeChange(parsedData);
    }
  }; */

  return (
    <TextField
      label="Nota"
      name="grade"
      fullWidth
      type="number"
      precision={presicion}
      max={5}
      min={0}
      size="small"
      InputLabelProps={{ shrink: true }}
      onChange={handleChange}
      // onBlur={onInputOut}
      value={value}
      className={classes.root}
      {...props}
    />
  );
}
