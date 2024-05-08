import React, { useState, useEffect } from 'react';
import { Typography, Grid, Divider, Container } from '@material-ui/core';
import SalaUsuarioItem from './SalaUsuarioItem';

const SalaUsuarioList = () => {
  const [salasUsuario, setSalasUsuario] = useState([]);

  useEffect(() => {
    obtenerDatosSalaUsuario();
  }, []);

  const obtenerDatosSalaUsuario = () => {
    const datosSalasUsuario = [
      { id: 1, nombre: 'SDU1', bloque: 'A', piso: 1, computadorasDisponibles: 20, equiposPrestamoDisponibles: 5 },
      { id: 2, nombre: 'SDU2', bloque: 'B', piso: 2, computadorasDisponibles: 15, equiposPrestamoDisponibles: 3 },
      { id: 3, nombre: 'SDU3', bloque: 'C', piso: 3, computadorasDisponibles: 10, equiposPrestamoDisponibles: 8 },
      { id: 4, nombre: 'SDU4', bloque: 'D', piso: 4, computadorasDisponibles: 18, equiposPrestamoDisponibles: 6 },
      { id: 5, nombre: 'SDU5', bloque: 'E', piso: 5, computadorasDisponibles: 25, equiposPrestamoDisponibles: 2 },
      { id: 6, nombre: 'SDU6', bloque: 'F', piso: 6, computadorasDisponibles: 12, equiposPrestamoDisponibles: 4 },
      { id: 7, nombre: 'SDU7', bloque: 'G', piso: 7, computadorasDisponibles: 22, equiposPrestamoDisponibles: 7 },
      { id: 8, nombre: 'SDU8', bloque: 'H', piso: 8, computadorasDisponibles: 17, equiposPrestamoDisponibles: 9 },
      { id: 9, nombre: 'SDU9', bloque: 'I', piso: 9, computadorasDisponibles: 14, equiposPrestamoDisponibles: 1 },
      { id: 10, nombre: 'SDU10', bloque: 'J', piso: 10, computadorasDisponibles: 30, equiposPrestamoDisponibles: 0 }
    ];
    setSalasUsuario(datosSalasUsuario);
  };

  return (
    <Container style={{ backgroundColor: '#e0e0e0', padding: '20px' }}>
      <Grid container spacing={2}>
        {salasUsuario.map((sala, index) => (
          <Grid item xs={6} key={sala.id}>
            <SalaUsuarioItem sala={sala} isRight={index % 2 !== 0} />
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SalaUsuarioList;
