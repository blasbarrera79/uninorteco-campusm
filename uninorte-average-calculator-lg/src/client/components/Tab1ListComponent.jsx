import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import CardComponent from './CardComponent';


const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 10,
  },
  card: {
    width: '100%',
  },
  container: {
    paddingTop: 20,
  },
});

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
      <Container className={classes.container}>
        <CardComponent title="Promedio semestral" credit={17} parcelacion={false} grade="4.5" />
        <CardComponent title="Promedio semestral" parcelacion={false} grade="4.5" text="Promediado con este semestre" />
      </Container>
    </Container>
  );
}

Tab1ListComponent.propTypes = {
  materias: PropTypes.array,
};

export default Tab1ListComponent;
