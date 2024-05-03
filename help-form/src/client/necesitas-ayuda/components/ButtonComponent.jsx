import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',    
  },
}));

const ButtonComponent = ({ disabled}) => {

  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      type="submit"
      disabled={disabled}
    >
      Enviar
    </Button>
  );
};

ButtonComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default ButtonComponent;
