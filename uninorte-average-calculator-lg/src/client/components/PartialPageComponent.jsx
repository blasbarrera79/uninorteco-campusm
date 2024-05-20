import React from 'react';
import { Container } from '@ombiel/aek-lib';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
// import { useLocation } from 'react-router-dom';
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

function PartialPageComponent() {

  const classes = useStyles();
  // const location = useLocation();
  // const datos = location.state.datos;
  const datos = [{
    SHRMRKS_CRN: "5470",
    SHRGCOM_SEQ_NO: 1,
    SHRGCOM_NAME: "TALLER 1ER",
    SHRGCOM_DESCRIPTION: "Talleres 1ra sesión",
    SHRGCOM_WEIGHT: 25,
    NOTA: 5,
    NOTAA: "5.0"
  },
  {
    SHRMRKS_CRN: "5470",
    SHRGCOM_SEQ_NO: 2,
    SHRGCOM_NAME: "TALLER 2DA",
    SHRGCOM_DESCRIPTION: "Talleres 2da sesión",
    SHRGCOM_WEIGHT: 25,
    NOTA: 4.5,
    NOTAA: "4.5"
  },
  {
    SHRMRKS_CRN: "5470",
    SHRGCOM_SEQ_NO: 3,
    SHRGCOM_NAME: "TALLER 3ER",
    SHRGCOM_DESCRIPTION: "Talleres 3ra sesión",
    SHRGCOM_WEIGHT: 25,
    NOTA: 4.6,
    NOTAA: "4.6"
  },
  {
    SHRMRKS_CRN: "5470",
    SHRGCOM_SEQ_NO: 4,
    SHRGCOM_NAME: "TALLER 4TA",
    SHRGCOM_DESCRIPTION: "Taller 4ta sesión",
    SHRGCOM_WEIGHT: 25,
    NOTA: 4.5,
    NOTAA: "4.5"
  }]


  return (
    <Container className={classes.root}>
      {datos.map((item) => (
        <CardComponent
          key={item.SHRGCOM_NAME}
          title={item.SHRGCOM_NAME}
          credit={item.SHRGCOM_WEIGHT}
          grade={item.NOTA}
          disabled
        />
      ))}
      <Divider />
      <Container className={classes.container}>
        <CardComponent title="Nota final" parcelacion={false} grade={4.0} text="Porcentaje evaluado" />
      </Container>
      <ButtonComponent text="Mas sobre acumulado - semestral" />
    </Container>
  );
}

PartialPageComponent.propTypes = {
};

export default PartialPageComponent;
