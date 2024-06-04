import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listItem:{
    paddingTop: 0,
    paddingBottom: 0,
  }
}));
const CheckboxList = ({ formData, categoriasOptions, handleCategoriaChange }) =>{
  const classes = useStyles();

  // Verificar si categoriasOptions está definido y si la categoría principal seleccionada tiene opciones
  const categoriaPrincipal = formData.categoriaPrincipal;
  const categorias = categoriasOptions[categoriaPrincipal] || [];

  return (
    <List className={classes.root}>
      {categorias.map((categoria) => (
        <ListItem className={classes.listItem} key={categoria}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={formData.categorias.includes(categoria)}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': categoria }}
              onChange={() => handleCategoriaChange(categoria)}
            />
          </ListItemIcon>
          <ListItemText primary={categoria} />
        </ListItem>
      ))}
    </List>
  );
}


export default CheckboxList;
