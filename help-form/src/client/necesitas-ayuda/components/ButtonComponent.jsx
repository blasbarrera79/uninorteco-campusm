import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    color: '#FFFFFF', // Color blanco para el texto
    fontSize: '1.2rem', // Tamaño de fuente más grande
    textTransform: 'none', //
  },
}));

const ButtonComponent = ({ disabled }) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      style={{ backgroundColor: '#d10a11' }} // Cambiar el color de fondo aquí
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
