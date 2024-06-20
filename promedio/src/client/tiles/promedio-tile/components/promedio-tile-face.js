import React from 'react';
import { Box, Grid } from '@mui/material';
const services = [
  { id: 1, name: 'Mis Notas', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/mis-notas-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000030212' },
  { id: 2, name: 'Evaluación Docente', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/evaluacion-docente-rounded.png', url: 'campusm://openURL?url=https://pomelo.uninorte.edu.co/evaluaciondoc/index.zul' },
  { id: 3, name: 'Calculadora de Promedio', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/calculadora-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000030214' },
  { id: 4, name: 'Mis Exámenes Finales', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/finales-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000030213' },
  { id: 5, name: 'Servicios Bibliograficos', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/servicios-biblio-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000030211' },
  { id: 6, name: 'Financiamiento', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/financiamiento-rounded.png', url: 'campusm://openURL?url=https://www.uninorte.edu.co/web/apoyo-financiero' },
  { id: 7, name: 'Enlaces de Interes', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/enlaces-interes-rounded.png', url: 'campusm://pocketguide?pg_code=1000029068' },
  { id: 8, name: 'Centro Medico', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/centro-medico-rounded.png', url: 'campusm://pocketguide?pg_code=1000029066' },
  { id: 9, name: 'Buzón de sugerencias', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/buzon-rounded.png', url: 'campusm://openURL?url=https://www.uninorte.edu.co/sugerencias' },
  { id: 10, name: '¿Necesitas Ayuda?', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorte/icons-rounded/ayuda-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000030219' },
];

export default function ServicesList() {
  return (
    <Box>
      <Grid container justifyContent="center">
        {services.map((service) => (
          <Grid item key={service.id} xs={6} md={6}>
            <Box
              component="a"
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              display="flex"
              justifyContent="center"
              textDecoration="none"
              color="inherit"
              sx={{
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                margin: 'auto',
                textAlign: 'center', // Center align text
              }}
            >
              <Box
                component="img"
                alt={service.name}
                src={service.image}
                sx={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
