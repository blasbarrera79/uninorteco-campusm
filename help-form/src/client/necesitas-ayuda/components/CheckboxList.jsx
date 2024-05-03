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

  return (
    <List className={classes.root}>
      {formData.categoriaPrincipal && categoriasOptions[formData.categoriaPrincipal].map((categoria) => (
        <ListItem className={classes.listItem} key={categoria}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={formData.categorias.includes(categoria)}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': categoria }}
              onChange={(e) => handleCategoriaChange(e, categoria)}
            />
          </ListItemIcon>
          <ListItemText primary={categoria} />
        </ListItem>
      ))}
    </List>
  );
}

CheckboxList.propTypes = {
  formData: PropTypes.object.isRequired,
  categoriasOptions: PropTypes.object.isRequired,
  handleCategoriaChange: PropTypes.func.isRequired,
};


export default CheckboxList;
