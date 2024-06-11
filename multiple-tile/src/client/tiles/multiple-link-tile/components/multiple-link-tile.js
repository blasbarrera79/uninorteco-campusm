import React from 'react';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { TileFace } from "@ombiel/cm-tile-sdk";

const services = [
  { id: 1, name: 'Mis Notas', image: 'url_imagen1', url: 'https://www.uninorte.edu.co' },
  { id: 2, name: 'Evaluacion Docente', image: 'url_imagen2', url: 'https://www.uninorte.edu.co' },
  { id: 3, name: 'Calculadora de Promedio', image: 'url_imagen3', url: 'https://www.uninorte.edu.co' },
  { id: 4, name: 'Mis Examenes Finales', image: 'url_imagen4', url: 'https://www.uninorte.edu.co' },
  { id: 5, name: 'Servicios Bibliograficos', image: 'url_imagen5', url: 'https://www.uninorte.edu.co' },
  { id: 6, name: 'Financiamiento', image: 'url_imagen6', url: 'https://www.uninorte.edu.co' },
  { id: 7, name: 'Enlaces de Interes', image: 'url_imagen7', url: 'https://www.uninorte.edu.co' },
  { id: 8, name: 'Centro Medico', image: 'url_imagen8', url: 'https://www.uninorte.edu.co' }
];

const ServicesList = () => {
  return (
    <TileFace>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} key={service.id}>
            <ListItem
              button
              component="a"
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ paddingTop: 4, paddingBottom: 4 }} // Ajuste de padding vertical
            >
              <ListItemAvatar>
                <Avatar alt={service.name} src={service.image} />
              </ListItemAvatar>
              <ListItemText primary={service.name} />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </TileFace>
  );
};

export default ServicesList;
