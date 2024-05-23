import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardComponent from './CardComponent';
import ButtonComponent from '../../../components/ButtonComponent';


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

const semesterAverage = (materias) => {
  return materias.reduce((acc, materia) => {
    return acc + (materia.NOTAA * materia.CREDITOS);
  }, 0) / materias.reduce((acc, materia) => {
    return acc + materia.CREDITOS;
  }, 0);
};


function Tab1ListComponent(props) {

  const classes = useStyles();
  const { materias } = props;
  const PGA = (materias[0].PUNTOS / materias[0].CREDITOS).toFixed(2);
  const PSA = semesterAverage(materias).toFixed(2);
  console.log(materias);
  return (
    <Container className={classes.root}>
      {materias.length > 0 ? materias.map((item) => (
        <CardComponent
          key={item.SSBSECT_CRSE_TITLE}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.CREDITOS}
          grade={item.NOTAA}
          disabled
          partial={item.parciales}
        />
      )) : null}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Promedio semestral" credit={17} parcelacion={false} grade={PSA} />
        <CardComponent title="Promedio acumulado" parcelacion={false} grade={PGA} text="Promediado con este semestre" />
      </Container>
      <ButtonComponent text="Mas sobre acumulado - semestral" />
    </Container>
  );
}

Tab1ListComponent.propTypes = {
  materias: PropTypes.array,
};

export default Tab1ListComponent;
