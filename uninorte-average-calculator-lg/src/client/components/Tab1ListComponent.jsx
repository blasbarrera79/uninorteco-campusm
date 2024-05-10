import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardComponent from './CardComponent';
import ButtonComponent from './ButtonComponent';


const useStyles = makeStyles((theme)=> ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
  },
  card: {
    width: '100%',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function Tab1ListComponent(props) {

  const classes = useStyles();
  const { materias } = props;
  console.log(materias);
  return (
    <Container className={classes.root}>
      {materias.map((item) => (
        <CardComponent
          key={item.SHRGCOM_NAME}
          title={item.SHRGCOM_NAME}
          credit={item.CREDITOS}
          grade={item.NOTAA}
        />
      ))}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Promedio semestral" credit={17} parcelacion={false} grade="4.5" />
        <CardComponent title="Promedio acumulado" parcelacion={false} grade="4.5" text="Promediado con este semestre" />
      </Container>
      <ButtonComponent text="Mas sobre acumulado - semestral" />
    </Container>
  );
}

Tab1ListComponent.propTypes = {
  materias: PropTypes.array,
};

export default Tab1ListComponent;
