import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0",
  },
  inputLabel: {
    marginLeft: "2em",
  },
  nativeSelect: {
    fontSize: "1.3em",
    "& option": {
      textAlign: "center",
    },
  },
}));

export default function SelectComponent({ label, value, onChange, options }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel
        className={classes.inputLabel}
        id="select-label">
        {label}
      </InputLabel>
      <NativeSelect
        className={classes.nativeSelect}
        value={value}
        onChange={onChange}
        inputProps={{
          name: "select",
          id: "select-native",
        }}>
        <option
          aria-label="None"
          value="Null"
        />
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
