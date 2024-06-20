import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import CardComponent from './CardComponent';
import { calculateSemesterAverage, calculateNeededGrades } from '../../../utils/semester-grades';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@import': "url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap')",
  },
  root: {
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: '#1d1d1b',
    fontFamily: 'Quicksand, sans-serif',
    color: '#ffffff',
    borderRadius: 10,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  description: {
    padding: theme.spacing(1),
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#ffffff',
    margin: `${theme.spacing(2)}px 0`,
  },
}));

function Tab2ListComponent({ materias }) {
  const classes = useStyles();

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

  const updateQualifications = (targetGrade, newGrade) => {
    setGradesWithQualifications((prevGrades) => {
      const updatedGrades = prevGrades.map(materia => {
        if (materia.SSBSECT_CRSE_TITLE === targetGrade.SSBSECT_CRSE_TITLE) {
          const parsedGrade = parseFloat(newGrade);
          if (isNaN(parsedGrade)) {
            setErrorMessage('Invalid grade input. Please enter a valid number.');
            setOpenSnackbar(true);
            return materia;
          }
          if (parsedGrade < 0 || parsedGrade > 100) {
            setErrorMessage('Grade must be between 0 and 100.');
            setOpenSnackbar(true);
            return materia;
          }
          return {
            ...materia,
            NOTAA: parsedGrade,
            isModified: true,
          };
        }
        return materia;
      });
      setCurrentPSA(calculateSemesterAverage(updatedGrades));
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
  };

  const updateAverage = (newGrade) => {
    try {
      const updatedGrades = calculateNeededGrades(gradesWithQualifications, newGrade);
      setGradesWithQualifications(updatedGrades);
      setCurrentPSA(newGrade);
    } catch (error) {
      setErrorMessage(error.message);
      setOpenSnackbar(true); 
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className={classes.root}>
      <Typography className={classes.description}>
        PARA DEJAR UNA NOTA FIJA, DEBE SELECCIONAR EL CHECKBOX CORRESPONDIENTE.
      </Typography>
      {gradesWithQualifications.map((item) => (
        <CardComponent
          key={item.SSBSECT_CRSE_TITLE}
          title={item.SSBSECT_CRSE_TITLE}
          credit={item.SFRSTCR_CREDIT_HR}
          grade={typeof item.NOTAA === 'number' ? parseFloat(item.NOTAA).toFixed(1) : item.NOTAA}
          partial={item.items}
          updateLock={() => handleIsLocked(item)}
          edit
          updateQualifications={(newGrade) => updateQualifications(item, newGrade)}
          cardType="blue"
          weight={item.SFRSTCR_CREDIT_HR}
        />
      ))}
      <Divider className={classes.divider} />
      <Typography className={classes.description}>
        ESCRIBA AQUÍ EL PROMEDIO DEL SEMESTRE DESEADO.
      </Typography>
      <CardComponent
        weight={1}
        cardType="green"
        title="Promedio Semestral"
        parcelacion={false}
        canLock={false}
        grade={currentPSA.toFixed(1)}
        text="Las asignaturas no bloqueadas serán modificadas para obtener un promedio semestral de:"
        edit
        updateQualifications={(newGrade) => updateAverage(newGrade)}
      />
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












