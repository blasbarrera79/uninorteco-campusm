import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  input: {
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
  },
  label: {
    color: '#d10a11',
    fontWeight: 'bold',
    fontSize: '1rem',
    fontFamily: 'Quicksand, sans-serif',
  },
  outlinedInput: {
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1d1d1b',
      },
      '&:hover fieldset': {
        borderColor: '#d10a11',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#d10a11',
      },
    },
  },
}));

const InputComponent = ({ label, name, value, onChange, placeholder, type = "text" }) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      InputProps={{ classes: { root: classes.outlinedInput, input: classes.input } }}
      InputLabelProps={{ className: classes.label }}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
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



