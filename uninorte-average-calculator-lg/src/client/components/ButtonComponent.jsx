import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
  },
}));

const ButtonComponent = (props) => {  
  const { text } = props;
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" color="primary">
      {text}
    </Button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
}; 

export default ButtonComponent;
