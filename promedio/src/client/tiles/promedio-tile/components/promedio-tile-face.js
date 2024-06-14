import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { PieChart } from 'react-minimal-pie-chart';
import { FaCheckSquare } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { useServerAction, TileFace, LoadingSpinner } from "@ombiel/cm-tile-sdk";

export default function MyTile() {
  const [promedioAcumulado, setPromedioAcumulado] = useState(null);
  const [promedioSemestral, setPromedioSemestral] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [response] = useServerAction("notas", { method: "GET" });

  useEffect(() => {
    if (response && response.responseBody) {
      setPromedioAcumulado(parseFloat(response.responseBody.promedioAcumulado));
      setPromedioSemestral(parseFloat(response.responseBody.promedioSemestral));
      setIsLoading(false);
    }
  }, [response]);

  const getEstado = (promedio) => {
    if (promedio < 3.25) return "Riesgo";
    if (promedio >= 3.25 && promedio < 3.96) return "Normal";
    return "Distinguido";
  };

  const estadoAcumulado = promedioAcumulado !== null ? getEstado(promedioAcumulado) : "";
  const estadoSemestral = promedioSemestral !== null ? getEstado(promedioSemestral) : "";

  const getIcon = (estado) => (estado === "Riesgo" ? <TiWarning size={30} /> : <FaCheckSquare size={30} />);
  const getColor = (estado) => (estado === "Riesgo" ? "#F8ED0F" : "#0F46F8");

  if (isLoading) {
    return (
      <TileFace>
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
          <LoadingSpinner />
        </Box>
      </TileFace>
    );
  }

  const createData = (value, color) => [
    { value, color },
    { value: 5 - value, color: "#e0e0e0" }
  ];

  const dataAcumulado = createData(promedioAcumulado, "#8884d8");
  const dataSemestral = createData(promedioSemestral, "#82ca9d");

  const radius = 50; // Valor predeterminado para el radio

  return (
    <TileFace>
      <Box p={3} bgcolor="#f5f5f5">
        <Typography variant="h5" gutterBottom align="center">
          Rendimiento Académico
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Box position="relative">
            <PieChart
              data={dataAcumulado}
              startAngle={180}
              lengthAngle={180}
              lineWidth={20}
              paddingAngle={5}
              rounded
              label={({ dataEntry }) => dataEntry.value === promedioAcumulado ? promedioAcumulado.toFixed(2) : ""}
              labelStyle={(index) => ({
                fill: index === 0 ? '#8884d8' : 'transparent',
                fontSize: '8px',
                fontFamily: 'sans-serif',
              })}
              radius={radius - 6}
              labelPosition={0}
              animate
            />
            <Box position="absolute" top="50%" left="60%" transform="translate(-50%, -50%)">
              <Avatar sx={{ width: 35, height: 35, backgroundColor: getColor(estadoAcumulado) }}>
                {getIcon(estadoAcumulado)}
              </Avatar>
            </Box>
            <Box position="absolute" top="85%" left="20%" transform="translate(-50%, -50%)">
              <Typography>Acumulado</Typography>
            </Box>
          </Box>

          <Box position="relative">
            <PieChart
              data={dataSemestral}
              startAngle={180}
              lengthAngle={180}
              lineWidth={20}
              paddingAngle={5}
              rounded
              label={({ dataEntry }) => dataEntry.value === promedioSemestral ? promedioSemestral.toFixed(2) : ""}
              labelStyle={(index) => ({
                fill: index === 0 ? '#82ca9d' : 'transparent',
                fontSize: '8px',
                fontFamily: 'sans-serif',
              })}
              radius={radius - 6}
              labelPosition={0}
              animate
            />
            <Box position="absolute" top="50%" left="60%" transform="translate(-50%, -50%)">
              <Avatar sx={{ width: 35, height: 35, backgroundColor: getColor(estadoSemestral) }}>
                {getIcon(estadoSemestral)}
              </Avatar>
            </Box>
            <Box position="absolute" top="85%" left="20%" transform="translate(-50%, -50%)">
              <Typography>Semestral</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </TileFace>
  );
}
