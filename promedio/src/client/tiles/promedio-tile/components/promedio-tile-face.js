import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const services = [
  { id: 1, name: 'Mis Notas', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/mis-notas-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000030105' },
  { id: 2, name: 'Evaluación Docente', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/evaluacion-docente-rounded.png', url: 'https://pomelo.uninorte.edu.co/evaluaciondoc/index.zul' },
  { id: 3, name: 'Calculadora de Promedio', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/calculadora-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000029735' },
  { id: 4, name: 'Mis Exámenes Finales', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/finales-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000026355' },
  { id: 5, name: 'Servicios Bibliograficos', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/servicios-biblio-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000029991' },
  { id: 6, name: 'Financiamiento', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/financiamiento-rounded.png', url: 'https://www.uninorte.edu.co/web/apoyo-financiero' },
  { id: 7, name: 'Enlaces de Interes', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/enlaces-interes-rounded.png', url: 'campusm://pocketguide?pg_code=1000029042' },
  { id: 8, name: 'Centro Medico', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/centro-medico-rounded.png', url: 'campusm://pocketguide?pg_code=1000026800' },
  { id: 9, name: 'Buzón de sugerencias', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/buzon-rounded.png', url: 'https://www.uninorte.edu.co/sugerencias' },
  { id: 10, name: '¿Necesitas Ayuda?', image: 'https://portal-na.campusm.exlibrisgroup.com/assets/UniversidaddelNorte/UniversidaddelNorteSandbox/icons-rounded/ayuda-rounded.png', url: 'campusm://loadaek?toolbar=AEK1000026466' },
];

export default function ServicesList() {
  return (
    <Box bgcolor="#f5f5f5">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr', md: '1fr 1fr' },
          gap: { xs: 1, md: 2 }, // Adjust the gap based on screen size
          justifyContent: 'center'
        }}
      >
        {services.map((service) => (
          <Box
            key={service.id}
            component="a"
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            display="flex"
            alignItems="center"
            p={{ xs: 1, md: 1 }} // Adjust padding based on screen size
            textDecoration="none"
            color="inherit"
            sx={{
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Avatar
              alt={service.name}
              src={service.image}
              sx={{
                width: { xs: 60, sm: 60, md: 60 },
                height: { xs: 60, sm: 60, md: 60 },
                mr: 2,
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="left"
              sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1rem' } }}
            >
              {service.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
