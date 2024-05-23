import React, {useState,useEffect} from 'react';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CardComponent from '../page-one/tab-two/CardComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { calculateNeededGradesWithWeights,calculateCurrentGradeAverage,calculateNewGradeAverage } from '../../my-domain-logic/partial-grades';


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

function PartialPageComponent() {

  const classes = useStyles();
  const location = useLocation();

  const [partialGrades, setPartialGrades] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar el Snackbar
  const [currentPSA, setCurrentPSA] = useState([]);
  const [gradesWithQualifications, setGradesWithQualifications] = useState([]);

  useEffect(() => {
    if (location.state?.datos) {
      setPartialGrades(location.state.datos);
      const initialGrades = location.state.datos.map(grade => ({
        ...grade,
        isModified: grade.NOTAA > 0,
        isLocked: false,
      }));
      setGradesWithQualifications(initialGrades);
      setCurrentPSA(calculateCurrentGradeAverage(initialGrades));
    }
  }, [location.state]);



  if (partialGrades.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  console.log("datos ",partialGrades);

  console.log("gradesWithQualifications ",gradesWithQualifications);
  console.log("currentPSA ",currentPSA);


  const updateQualifications = (targetGrade, newGrade) => {
    setGradesWithQualifications((prevGrades) => {
      const updatedGrades = prevGrades.map(materia => {
        if (materia.SHRGCOM_NAME === targetGrade.SHRGCOM_NAME) {
          return { ...materia, NOTAA: newGrade, isModified: true };
        }
        return materia;
      });
      setCurrentPSA(calculateNewGradeAverage(updatedGrades));
      return updatedGrades;
    });
  };

  const handleIsLocked = (targetGrade) => {
    setGradesWithQualifications((prevGrades) => {
      const updatedGrades = prevGrades.map(subject => {
        if (subject.SHRGCOM_NAME === targetGrade.SHRGCOM_NAME) {
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
        return calculateNeededGradesWithWeights(prevGrades, newGrade);
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
          key={item.SHRGCOM_NAME}
          title={item.SHRGCOM_NAME}
          credit={item.SHRGCOM_WEIGHT}
          grade={item.NOTAA}
          parcelacion={false}
          edit
          updateLock={(lock)=> handleIsLocked(item, lock)}
          updateQualifications={(newGrade) => updateQualifications(item, newGrade)}
        />
      ))}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Promedio acumulado" parcelacion={false} grade={currentPSA.toFixed(2)} edit canLock={false} text="Las asignaturas no bloqueadas serán modificadas para obtener un promedio semestral de:" updateQualifications={(newGrade)=> updateAverage(newGrade)} />
      </Container>
      <ButtonComponent text="Mas sobre acumulado - semestral" />
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

PartialPageComponent.propTypes = {
};

export default PartialPageComponent;
