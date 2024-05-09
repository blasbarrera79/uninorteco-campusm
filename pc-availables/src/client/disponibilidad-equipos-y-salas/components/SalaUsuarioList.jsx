import React, { useState, useEffect } from 'react';
import { Typography, Grid, Divider, Container } from '@material-ui/core';
import SalaUsuarioItem from './SalaUsuarioItem';
import { fetchData } from '../../../services/get-data'; // Corregido el import

const SalaUsuarioList = () => {
  const [salasUsuario, setSalasUsuario] = useState([]);

  useEffect(() => {
    obtenerDatosSalaUsuario();
  }, []);

  const obtenerDatosSalaUsuario = () => {
    // Utilizar fetchData en lugar de getData
    fetchData()
      .then((data) => {
        setSalasUsuario(data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  };

  return (
    <Container style={{ backgroundColor: '#e0e0e0', padding: '20px', height: "100%" }}>
      <Grid container spacing={2}>
        {salasUsuario.map((sala, index) => (
          <Grid item xs={6} key={index}>
            <SalaUsuarioItem sala={sala} isRight={index % 2 !== 0} />
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SalaUsuarioList;
