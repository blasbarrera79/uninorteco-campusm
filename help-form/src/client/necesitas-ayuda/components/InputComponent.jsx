import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

const InputComponent = ({ label, name, value, onChange, placeholder, type = "text"}) => {

  const classes = useStyles();

  return (
    <TextField
      className={classes.input}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      fullWidth
      margin="normal"
    />
  );
};

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default InputComponent;
