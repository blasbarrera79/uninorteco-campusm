import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Label from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',    
  },
}));

const TextAreaComponent = ({ label, name, value, onChange}) => {

  const classes = useStyles();

  return (
    <>
      <Label>{label}</Label>
      <TextareaAutosize
        className={classes.input}
        aria-label={label}
        minRows={5}
        maxRows={5}
        name={name}
        defaultValue={value}
        onChange={onChange}
      />
    </>
  );
};

TextAreaComponent.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaComponent;
