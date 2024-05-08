import React from 'react';
import { Link } from 'react-router-dom';

const Tab1ListComponent = () => (
  <ul>
    <li><Link to="/item/1">Items 1</Link></li>
    <li><Link to="/item/2">Item 2</Link></li>
    {/* Otros elementos de la lista */}
  </ul>
);

export default Tab1ListComponent;
