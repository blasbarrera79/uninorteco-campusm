import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CardComponent from './CardComponent';
import ButtonComponent from '../../../components/ButtonComponent';
import { calculateSemesterAverage, calculateNewSemesterAverage, creditsWithGrades, calculateCurrentAverage , calculateNeededGrades } from '../../../utils/semester-grades';

const useStyles = makeStyles((theme) => ({
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

function Tab2ListComponent(props) {
  const classes = useStyles();
  const { materias } = props;

  const initialGrades = materias.map(materia => ({
    ...materia,
    isModified: materia.NOTAA > 0,
    isLocked: false,
  }));

  const [currentPSA, setCurrentPSA] = useState(calculateSemesterAverage(initialGrades));
  const [gradesWithQualifications, setGradesWithQualifications] = useState(initialGrades);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar el Snackbar


  const updateQualifications = (targetGrade, newGrade) => {
    setGradesWithQualifications((prevGrades) => {
      const updatedGrades = prevGrades.map(materia => {
        if (materia.SSBSECT_CRSE_TITLE === targetGrade.SSBSECT_CRSE_TITLE) {
          return { ...materia, NOTAA: newGrade, isModified: true };
        }
        return materia;
      });
      const currentAverage = calculateCurrentAverage(updatedGrades);
      const updatedCredits = creditsWithGrades(updatedGrades);
      setCurrentPSA(calculateNewSemesterAverage(currentAverage, updatedCredits, newGrade, targetGrade.CREDITOS));
      return updatedGrades;
    });
  };

  const handleIsLocked = (targetGrade) => {
    setGradesWithQualifications((prevGrades) => {
      const updatedGrades = prevGrades.map(subject => {
        if (subject.SSBSECT_CRSE_TITLE === targetGrade.SSBSECT_CRSE_TITLE) {
          return { ...subject, isLocked: !subject.isLocked };
        }
        return subject;
      });
      console.log(updatedGrades);
      return updatedGrades;
    });
  }

  const updateAverage = (newGrade) => {
    setGradesWithQualifications((prevGrades) => {
      try {
        return calculateNeededGrades(prevGrades, newGrade);
      } catch (error) {
        setErrorMessage(error.message);
        setOpenSnackbar(true); 
        return prevGrades;
      }
    });
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className={classes.root}>
      {gradesWithQualifications.map((item) => (
        <CardComponent
          key={item.SSBSECT_CRSE_TITLE}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.SFRSTCR_CREDIT_HR}
          grade={item.NOTAA}
          partial={item.items}
          updateLock={(lock)=> handleIsLocked(item, lock)}
          edit
          updateQualifications={(newGrade) => updateQualifications(item, newGrade)}
        />
      ))}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Promedio acumulado semestral" parcelacion={false} canLock={false} grade={currentPSA.toFixed(2)} text="Las asignaturas no bloqueadas serán modificadas para obtener un promedio semestral de:" edit updateQualifications={(newGrade)=> updateAverage(newGrade)} />
      </Container>
      {/* <ButtonComponent text="Mas sobre acumulado - semestral" /> */}
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

Tab2ListComponent.propTypes = {
  materias: PropTypes.array.isRequired,
};

export default Tab2ListComponent;
