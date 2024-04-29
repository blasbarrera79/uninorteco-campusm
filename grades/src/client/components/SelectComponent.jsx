import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  formControl: {
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
        id="select-label"
      >
        {label}
      </InputLabel>
      <NativeSelect
        className={classes.nativeSelect}
        value={value}
        onChange={onChange}
        inputProps={{
          name: "select",
          id: "select-native",
        }}
      >
        {options.map((option) => (
          <option
            key={option.PERIODO}
            value={option.PERIODO}
          >
            {option.DESCRIPTION}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
