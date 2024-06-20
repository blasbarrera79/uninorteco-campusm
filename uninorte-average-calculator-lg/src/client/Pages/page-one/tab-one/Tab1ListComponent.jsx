import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import CardComponent from './CardComponent';
import { calculateSemesterCredits, semesterAverage } from '../../../utils/validations';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@import': "url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap')",
  },
  root: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#1d1d1b', // Background color for the container
    color: '#ffffff', // Text color for the container
    fontFamily: 'Quicksand', // Font family
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  divider: {
    backgroundColor: '#d10a11', // Red color for the divider
    margin: theme.spacing(2, 0), // Margin for the divider
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
      {materias.map((item, index) => (
        <CardComponent
          key={index}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.SFRSTCR_CREDIT_HR}
          grade={item.NOTAA}
          partial={item.items}
          cardType="default" // Default card type
        />
      ))}
      <Divider className={classes.divider} />
      <Container className={classes.container}>
        <CardComponent title="Promedio semestral" credit={semesterCredits} parcelation={false} grade={PSA} cardType="highlight" />
        <CardComponent title="Promedio acumulado" parcelation={false} grade={PGA} text="Promediado con este semestre" cardType="highlight" />
      </Container>
    </Container>
  );
}

Tab1ListComponent.propTypes = {
  materias: PropTypes.array,
};

export default Tab1ListComponent;





