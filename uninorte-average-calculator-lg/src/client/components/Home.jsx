import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TabsComponent from './TabsComponent';
import Tab1ListComponent from './Tab1ListComponent';
import Tab2ListComponent from './Tab2ListComponent';
import ItemDetailComponent from './ItemDetailComponent';
import OtherViewComponent from './OtherViewComponent';
import NotFoundComponent from './NotFoundComponent';

const Home = () => {
  return (
    <Router>
      <TabsComponent />
      <Routes>
        <Route exact path="/" element={<Tab1ListComponent />} />
        <Route path="/tab2" element={<Tab2ListComponent />} />
        <Route path="/item/:id" element={<ItemDetailComponent />} />
        <Route path="/otherview" element={<OtherViewComponent />} />
        <Route element={<NotFoundComponent />} />
      </Routes>
    </Router>
  );
};

export default Home;
