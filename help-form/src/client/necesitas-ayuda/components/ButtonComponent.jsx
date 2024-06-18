import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    color: '#FFFFFF',
    fontSize: '1.2rem',
    textTransform: 'none',
    backgroundColor: '#d10a11',
    borderRadius: '4px',
    padding: theme.spacing(1.5),
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#b0090f',
    },
    '&:disabled': {
      backgroundColor: '#d10a11',
      opacity: 0.7,
    },
  },
}));

const ButtonComponent = ({ disabled }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
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


