import React from 'react';
import { Typography, Card, CardActionArea, CardContent, Grid, makeStyles, Divider } from '@material-ui/core';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows'; // Icono para equipos de sala
import LaptopIcon from '@material-ui/icons/Laptop'; // Icono para equipos de préstamo

// Estilos personalizados
const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      width: '4px',
      height: '100%',
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
      backgroundColor: theme.palette.primary.main, // Color del borde izquierdo
    },
  },
  rightBorder: {
    '&::before': {
      left: 'auto',
      right: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
      backgroundColor: theme.palette.secondary.main, // Color del borde derecho
    },
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1), // Espacio entre el icono y el texto
  },
}));

const SalaUsuarioItem = ({ sala, isRight }) => {
  const classes = useStyles(); // Inicializar los estilos

  return (
    <Card variant="outlined" className={`${classes.card} ${isRight ? classes.rightBorder : ''}`}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2">
            {sala.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Bloque: {sala.bloque}, Piso: {sala.piso}
          </Typography>
          <Grid container justifyContent='flex-end'>
            <Grid item className={classes.iconContainer}>
              <LaptopIcon className={classes.icon} />
              <Typography variant="body2" component="span">
                {sala.equiposPrestamoDisponibles}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item className={classes.iconContainer}>
              <DesktopWindowsIcon className={classes.icon} />
              <Typography variant="body2" component="span">
                {sala.computadorasDisponibles}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SalaUsuarioItem;


