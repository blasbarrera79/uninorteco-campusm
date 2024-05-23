import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TabsComponent from './TabsComponent';
import Tab1ListComponent from '../Pages/page-one/tab-one/Tab1ListComponent';
import Tab2ListComponent from '../Pages/page-one/tab-two/Tab2ListComponent';
import PartialPageComponent from '../Pages/page-two/PartialPageComponent';
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 64,
  },
});

const Home = () => {
  const classes = useStyles();

  const subjects = [
    {
      SFRSTCR_CRN: "5469",
      SSBSECT_CRSE_TITLE: "TEC EMERGENT PARA DESA DE SOFT",
      SFRSTCR_CREDIT_HR: 3,
      PUNTOS: 23.9,
      CREDITOS: 5,
      "(SELECTSHRTTRM_ASTD_CODE_END_OF_TERMESTADOFROMSHRTTRMWHERESHRTTRM_PIDM=SPRIDEN_PIDMANDSHRTTRM_TERM_CODE=SFRSTCR_TERM_CODE)": "ED",
      parciales: [],
      NOTAA: 0
    },
    {
      SFRSTCR_CRN: "5470",
      SSBSECT_CRSE_TITLE: "PROC DE SOFTWARE Y PRAC AGILES",
      SFRSTCR_CREDIT_HR: 3,
      PUNTOS: 23.9,
      CREDITOS: 5,
      "(SELECTSHRTTRM_ASTD_CODE_END_OF_TERMESTADOFROMSHRTTRMWHERESHRTTRM_PIDM=SPRIDEN_PIDMANDSHRTTRM_TERM_CODE=SFRSTCR_TERM_CODE)": "ED",
      parciales: [
        {
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
        }
      ],
      NOTAA: 4.65
    },
    {
      SFRSTCR_CRN: "5471",
      SSBSECT_CRSE_TITLE: "TOPICOS ESPECIALES I",
      SFRSTCR_CREDIT_HR: 3,
      PUNTOS: 23.9,
      CREDITOS: 5,
      "(SELECTSHRTTRM_ASTD_CODE_END_OF_TERMESTADOFROMSHRTTRMWHERESHRTTRM_PIDM=SPRIDEN_PIDMANDSHRTTRM_TERM_CODE=SFRSTCR_TERM_CODE)": "ED",
      parciales: [],
      NOTAA: 0
    },
    {
      SFRSTCR_CRN: "5473",
      SSBSECT_CRSE_TITLE: "VALIDACION Y VERIFICACION SOFT",
      SFRSTCR_CREDIT_HR: 2,
      PUNTOS: 23.9,
      CREDITOS: 5,
      "(SELECTSHRTTRM_ASTD_CODE_END_OF_TERMESTADOFROMSHRTTRMWHERESHRTTRM_PIDM=SPRIDEN_PIDMANDSHRTTRM_TERM_CODE=SFRSTCR_TERM_CODE)": "ED",
      parciales: [],
      NOTAA: 0
    },
    {
      SFRSTCR_CRN: "5474",
      SSBSECT_CRSE_TITLE: "CALIDAD DEL SOFTWARE",
      SFRSTCR_CREDIT_HR: 2,
      PUNTOS: 23.9,
      CREDITOS: 5,
      "(SELECTSHRTTRM_ASTD_CODE_END_OF_TERMESTADOFROMSHRTTRMWHERESHRTTRM_PIDM=SPRIDEN_PIDMANDSHRTTRM_TERM_CODE=SFRSTCR_TERM_CODE)": "ED",
      parciales: [],
      NOTAA: 0
    },
    {
      SFRSTCR_CRN: "5475",
      SSBSECT_CRSE_TITLE: "INTRODUC A LA ING DEL SOFTWARE",
      SFRSTCR_CREDIT_HR: 2,
      PUNTOS: 23.9,
      CREDITOS: 5,
      "(SELECTSHRTTRM_ASTD_CODE_END_OF_TERMESTADOFROMSHRTTRMWHERESHRTTRM_PIDM=SPRIDEN_PIDMANDSHRTTRM_TERM_CODE=SFRSTCR_TERM_CODE)": "ED",
      parciales: [
        {
          SHRMRKS_CRN: "5475",
          SHRGCOM_SEQ_NO: 1,
          SHRGCOM_NAME: "TAREAS/QUI",
          SHRGCOM_DESCRIPTION: "Tareas y Quices de comprobación de lectura",
          SHRGCOM_WEIGHT: 30,
          NOTA: 5,
          NOTAA: "5.0"
        },
        {
          SHRMRKS_CRN: "5475",
          SHRGCOM_SEQ_NO: 2,
          SHRGCOM_NAME: "TALLERES",
          SHRGCOM_DESCRIPTION: "Talleres",
          SHRGCOM_WEIGHT: 50,
          NOTA: 5,
          NOTAA: "5.0"
        },
        {
          SHRMRKS_CRN: "5475",
          SHRGCOM_SEQ_NO: 3,
          SHRGCOM_NAME: "PRESENTACI",
          SHRGCOM_DESCRIPTION: "Presentación Grupal",
          SHRGCOM_WEIGHT: 20,
          NOTA: 4.6,
          NOTAA: "4.6"
        }
      ],
      NOTAA: 4.92
    }
  ];

  return (
    <Router>
      <div className={classes.root}>
        <TabsComponent />;
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<Tab1ListComponent materias={subjects} />} />
          <Route path="/tab2" element={<Tab2ListComponent materias={subjects} />} />
          <Route path="/partial" element={<PartialPageComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Home;
