import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardComponent from './CardComponent';
import { calculateSemesterCredits, semesterAverage } from '../../../utils/validations';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function Tab1ListComponent(props) {
  const classes = useStyles();
  const { materias } = props;
  if (materias.length === 0) {
    return null;
  }

  const semesterCredits = calculateSemesterCredits(materias);
  const PGA = (materias[0].PUNTOS / materias[0].CREDITOS).toFixed(1);
  const PSA = semesterAverage(materias).toFixed(1);

  return (
    <Container className={classes.root}>
      {materias.length > 0 && materias.map((item, index) => (
        <CardComponent
          key={item.SSBSECT_CRSE_TITLE}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.SFRSTCR_CREDIT_HR}
          grade={item.NOTAA}
          partial={item.items}
          cardType="blue" // Set card type for cards above the divider
        />
      ))}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Promedio semestral" credit={semesterCredits} parcelation={false} grade={PSA} cardType="green" />
        <CardComponent title="Promedio acumulado" parcelation={false} grade={PGA} text="Promediado con este semestre" cardType="green" />
      </Container>
    </Container>
  );
}

Tab1ListComponent.propTypes = {
  materias: PropTypes.array,
};

export default Tab1ListComponent;
