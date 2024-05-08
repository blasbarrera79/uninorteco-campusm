import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TabsComponent from './TabsComponent';
import Tab1ListComponent from './Tab1ListComponent';
import Tab2ListComponent from './Tab2ListComponent';
import ItemDetailComponent from './ItemDetailComponent';
import OtherViewComponent from './OtherViewComponent';
// import NotFoundComponent from './NotFoundComponent';

const Home = () => {


  const object = [
    {
      SHRMRKS_CRN: "5470",
      SHRGCOM_SEQ_NO: 1,
      SHRGCOM_NAME: "TALLER 1ER",
      SHRGCOM_DESCRIPTION: "Talleres 1ra sesión",
      SHRGCOM_WEIGHT: 25,
      NOTA: 5,
      NOTAA: "5.0",
      CREDITOS: 3
    },
    {
      SHRMRKS_CRN: "5470",
      SHRGCOM_SEQ_NO: 2,
      SHRGCOM_NAME: "TALLER 2DA",
      SHRGCOM_DESCRIPTION: "Talleres 2da sesión",
      SHRGCOM_WEIGHT: 25,
      NOTA: 4.5,
      NOTAA: "4.5",
      CREDITOS: 3
    },
    {
      SHRMRKS_CRN: "5470",
      SHRGCOM_SEQ_NO: 3,
      SHRGCOM_NAME: "TALLER 3ER",
      SHRGCOM_DESCRIPTION: "Talleres 3ra sesión",
      SHRGCOM_WEIGHT: 25,
      NOTA: 4.6,
      NOTAA: "4.6",
      CREDITOS: 4
    },
    {
      SHRMRKS_CRN: "5470",
      SHRGCOM_SEQ_NO: 4,
      SHRGCOM_NAME: "TALLER 4TA",
      SHRGCOM_DESCRIPTION: "Taller 4ta sesión",
      SHRGCOM_WEIGHT: 25,
      NOTA: 4.5,
      NOTAA: "4.5",
      CREDITOS: 5
    }
  ];

  return (
    <Router>
      <TabsComponent />
      <Routes>
        <Route exact path="/" element={<Tab1ListComponent materias={object} />} />
        <Route path="/tab2" element={<Tab2ListComponent />} />
        <Route path="/item/:id" element={<ItemDetailComponent />} />
        <Route path="/otherview" element={<OtherViewComponent />} />
        {/* <Route element={<NotFoundComponent />} /> */}
      </Routes>
    </Router>
  );
};

export default Home;
