import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CardComponent from './CardComponent';
import { calculateSemesterAverage, calculateNewSemesterAverage, creditsWithGrades, calculateCurrentAverage, calculateNeededGrades } from '../../../utils/semester-grades';

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

function Tab2ListComponent(props) {
  const classes = useStyles();
  const { materias } = props;

  const [currentPSA, setCurrentPSA] = useState(0);
  const [gradesWithQualifications, setGradesWithQualifications] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const initialGrades = materias.map(materia => ({
      ...materia,
      isModified: materia.NOTAA > 0,
      isLocked: false,
    }));
    setGradesWithQualifications(initialGrades);
    setCurrentPSA(calculateSemesterAverage(initialGrades));
  }, [materias]);

  const filteredGrades = gradesWithQualifications.filter(item => item.CREDITOS);

  const updateQualifications = (targetGrade, newGrade) => {
    setGradesWithQualifications((prevGrades) => {
      const updatedGrades = prevGrades.map(materia => {
        if (materia.SSBSECT_CRSE_TITLE === targetGrade.SSBSECT_CRSE_TITLE) {
          // Comprobamos si el nuevo valor es numérico
          const parsedGrade = parseFloat(newGrade);
          if (isNaN(parsedGrade)) {
            throw new Error("La calificación debe ser un número válido.");
          }
          return { ...materia, NOTAA: parsedGrade, isModified: true };
        }
        return materia;
      });
      // Calculamos el nuevo promedio con las calificaciones actualizadas
      const newSemesterAverage = calculateSemesterAverage(updatedGrades);
      setCurrentPSA(newSemesterAverage);
      return updatedGrades;
    });
  };
  
  

  const handleIsLocked = (targetGrade) => {
    const updatedGrades = gradesWithQualifications.map(subject => {
      if (subject.SSBSECT_CRSE_TITLE === targetGrade.SSBSECT_CRSE_TITLE) {
        return { ...subject, isLocked: !subject.isLocked };
      }
      return subject;
    });
    setGradesWithQualifications(updatedGrades);
  }

  const updateAverage = (newGrade) => {
    try {
      const updatedGrades = calculateNeededGrades(gradesWithQualifications, newGrade);
      setGradesWithQualifications(updatedGrades);
      setCurrentPSA(newGrade); // Asignar el promedio deseado temporalmente para calcular las calificaciones necesarias
    } catch (error) {
      setErrorMessage(error.message);
      setOpenSnackbar(true); 
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className={classes.root}>
      {filteredGrades.map((item) => (
        <CardComponent
          key={item.SSBSECT_CRSE_TITLE}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.SFRSTCR_CREDIT_HR}
          grade={typeof item.NOTAA === 'number' ? parseFloat(item.NOTAA).toFixed(1) : item.NOTAA}
          partial={item.items}
          updateLock={(lock) => handleIsLocked(item, lock)}
          edit
          updateQualifications={(newGrade) => updateQualifications(item, newGrade)}
          cardType="blue"
          weight={item.SFRSTCR_CREDIT_HR}
        />
      ))}
      <Divider />
      <Container className={classes.container}>
        <CardComponent weight={1} cardType="green" title="Promedio acumulado semestral" parcelacion={false} canLock={false} grade={currentPSA.toFixed(1)} text="Las asignaturas no bloqueadas serán modificadas para obtener un promedio semestral de:" edit updateQualifications={(newGrade) => updateAverage(newGrade)} />
      </Container>
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
