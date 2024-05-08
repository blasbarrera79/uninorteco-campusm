import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailComponent = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalles del elemento {id}</h2>
      {/* Lógica para mostrar detalles según el ID */}
    </div>
  );
};

export default ItemDetailComponent;
