import React from 'react';
import { Link } from 'react-router-dom';

const Tab2ListComponent = () => (
  <ul>
    <li><Link to="/item/1">Item 1</Link></li>
    <li><Link to="/item/2">Item 2</Link></li>
    {/* Otros elementos de la lista */}
  </ul>
);

export default Tab2ListComponent;
