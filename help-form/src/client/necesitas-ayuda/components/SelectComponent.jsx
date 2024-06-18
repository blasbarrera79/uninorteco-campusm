import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  label: {
    color: '#d10a11',
    fontWeight: 'bold',
    fontSize: '1rem',
    fontFamily: 'Quicksand, sans-serif',
  },
  select: {
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      borderColor: '#d10a11',
    },
    '&:focus': {
      borderColor: '#d10a11',
    },
  },
}));

const SelectComponent = ({ options, value, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel className={classes.label} id="demo-simple-select-label">Categoría</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        label="Categoría"
        className={classes.select}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectComponent.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectComponent;



