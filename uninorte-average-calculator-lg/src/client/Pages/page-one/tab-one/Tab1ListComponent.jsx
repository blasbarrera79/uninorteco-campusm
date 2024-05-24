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
  // Filtrar materias con NOTAA válidos
  const validMaterias = materias.filter(materia => {
    const nota = parseFloat(materia.NOTAA);
    return !Number.isNaN(nota) && Number.isFinite(nota);
  });

  // Calcular el total de puntos ponderados (NOTAA * CREDITOS)
  const totalPonderado = validMaterias.reduce((acc, materia) => {
    return acc + (parseFloat(materia.NOTAA) * materia.CREDITOS);
  }, 0);

  // Calcular el total de créditos
  const totalCreditos = validMaterias.reduce((acc, materia) => {
    return acc + materia.CREDITOS;
  }, 0);

  // Retornar el promedio ponderado
  return totalCreditos > 0 ? totalPonderado / totalCreditos : 0;
};


const calculateSemesterCredits = (materias) => {
  return materias.reduce((acc, materia) => {
    return acc + materia.SFRSTCR_CREDIT_HR;
  }, 0);
}


function Tab1ListComponent(props) {

  const classes = useStyles();
  const { materias } = props;
  if (materias.length === 0) {
    return null;
  }
  console.log('materias',materias);
  console.log('calculater',calculateSemesterCredits(materias));
  const semesterCredits = calculateSemesterCredits(materias);
  const PGA = (materias[0].PUNTOS / materias[0].CREDITOS).toFixed(2);
  const PSA = semesterAverage(materias).toFixed(2);
  console.log(materias);
  return (
    <Container className={classes.root}>
      {materias.length > 0 ? materias.map((item) => (
        <CardComponent
          key={item.SSBSECT_CRSE_TITLE}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.SFRSTCR_CREDIT_HR}
          grade={item.NOTAA}
          disabled
          partial={item.items}
        />
      )) : null}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Promedio semestral" credit={semesterCredits} parcelation={false} grade={PSA} />
        <CardComponent title="Promedio acumulado" parcelation={false} grade={PGA} text="Promediado con este semestre" />
      </Container>
      <ButtonComponent text="Mas sobre acumulado - semestral" />
    </Container>
  );
}

Tab1ListComponent.propTypes = {
  materias: PropTypes.array,
};

export default Tab1ListComponent;
