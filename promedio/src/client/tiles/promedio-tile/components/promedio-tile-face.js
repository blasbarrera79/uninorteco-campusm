import React from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';

const services = [
  { id: 1, name: 'Mis Notas', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/mis-notas-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 2, name: 'Evaluacion Docente', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/evaluacion-docente-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 3, name: 'Calculadora de Promedio', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/calculadora-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 4, name: 'Mis Examenes Finales', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/finales-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 5, name: 'Servicios Bibliograficos', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/servicios-biblio-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 6, name: 'Financiamiento', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/financiamiento-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 7, name: 'Enlaces de Interes', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/enlaces-interes-rounded.png', url: 'https://www.uninorte.edu.co' },
  { id: 8, name: 'Centro Medico', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/centro-medico-rounded.png', url: 'https://www.uninorte.edu.co' }
];

export default function ServicesList() {
  return (
    <Box p={2} bgcolor="#f5f5f5">
      
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={1} sm={6} key={service.id}>
            <Box
              component="a"
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              alignItems="center"
              p={2}
              textDecoration="none"
              color="inherit"
              sx={{
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <Avatar alt={service.name} src={service.image} sx={{ width: 60, height: 60, mr: 2 }} />
              <Typography variant="h7">
                {service.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
