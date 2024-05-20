import React, { useState, useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  tab: {
    width: '50%', // Cada tab ocupa el 50% del ancho disponible
  },
  tabIndicator: {
    display: 'block', // Asegurarse de que el indicador esté visible
    backgroundColor: theme.palette.primary.main, // Color del indicador
    height: 2, // Altura del indicador
  },
}));

function PartialTabsComponent() {
  const [oldValue, setOldValue] = useState(null);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (oldValue === value) return;
    if (value === 0) {
      navigate('/partial');
    } else if (value === 1) {
      navigate('/partial2');
    }

    setOldValue(value);
  }, [navigate, oldValue, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      classes={{
        flexContainer: classes.tabsContainer,
        indicator: classes.tabIndicator,
      }}
    >
      <Tab className={classes.tab} label="Partial Page 1" />
      <Tab className={classes.tab} label="Partial Page 2" />
    </Tabs>
  );
}

export default PartialTabsComponent;
