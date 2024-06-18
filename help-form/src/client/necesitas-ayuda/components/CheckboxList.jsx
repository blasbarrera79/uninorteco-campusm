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
    borderRadius: '4px',
    padding: theme.spacing(1),
    borderColor: '#1d1d1b',
    borderStyle: 'solid',
    borderWidth: '1px',
    marginBottom: theme.spacing(2),
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontFamily: 'Quicksand, sans-serif',
  },
  checkbox: {
    color: '#d10a11',
    '&.Mui-checked': {
      color: '#d10a11',
    },
  },
  text: {
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 'bold',
    color: '#1d1d1b',
  },
}));

const CheckboxList = ({ formData, categoriasOptions, handleCategoriaChange }) => {
  const classes = useStyles();

  const categoriaPrincipal = formData.categoriaPrincipal;
  const categorias = categoriasOptions[categoriaPrincipal] || [];

  return (
    <List className={classes.root}>
      {categorias.map((categoria) => (
        <ListItem className={classes.listItem} key={categoria}>
          <ListItemIcon>
            <Checkbox
              className={classes.checkbox}
              edge="start"
              checked={formData.categorias.includes(categoria)}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': categoria }}
              onChange={() => handleCategoriaChange(categoria)}
            />
          </ListItemIcon>
          <ListItemText primary={categoria} classes={{ primary: classes.text }} />
        </ListItem>
      ))}
    </List>
  );
};

CheckboxList.propTypes = {
  formData: PropTypes.object.isRequired,
  categoriasOptions: PropTypes.object.isRequired,
  handleCategoriaChange: PropTypes.func.isRequired,
};

export default CheckboxList;



