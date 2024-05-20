import React, { useState, useEffect } from "react";
import { HBlock, VBlock, TextBox, TileFace, SvgBox, useServerAction, LoadingSpinner} from "@ombiel/cm-tile-sdk";
import { PieChart } from "react-minimal-pie-chart";
import { FaCheckSquare } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";

export default function MyTile() {
  // Inicializamos los promedios y el estado de carga
  const [promedioAcumulado, setPromedioAcumulado] = useState(null);
  const [promedioSemestral, setPromedioSemestral] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Llamada al servidor para obtener los datos
  const [response] = useServerAction("notas", { method: "GET" });

  useEffect(() => {
    if (response && response.responseBody) {
      setPromedioAcumulado(parseFloat(response.responseBody.promedioAcumulado));
      setPromedioSemestral(parseFloat(response.responseBody.promedioSemestral));
      setIsLoading(false);
    }
  }, [response]);

  // Calculamos el estado del rendimiento académico
  const getEstado = (promedio) => {
    if (promedio < 3.25) return "Riesgo";
    if (promedio >= 3.25 && promedio < 3.96) return "Normal";
    return "Distinguido";
  };

  const estadoAcumulado = promedioAcumulado !== null ? getEstado(promedioAcumulado) : "";
  const estadoSemestral = promedioSemestral !== null ? getEstado(promedioSemestral) : "";

  // Configuramos los datos para los gráficos tipo donut
  const getData = (promedio, estado) => [
    { title: estado, value: promedio * 20, color: estado === "Riesgo" ? "#E38627" : "#4CAF50" },
    { title: "Restante", value: (5 - promedio) * 20, color: estado === "Riesgo" ? "#C13C37" : "#2196F3" }
  ];

  const dataAcumulado = promedioAcumulado !== null ? getData(promedioAcumulado, estadoAcumulado) : [];
  const dataSemestral = promedioSemestral !== null ? getData(promedioSemestral, estadoSemestral) : [];

  // Determina el ícono y el color basado en el estado
  const getIcon = (estado) => (estado === "Riesgo" ? <TiWarning /> : <FaCheckSquare />);
  const getColor = (estado) => (estado === "Riesgo" ? "#F8ED0F" : "#0F46F8");

  // Si está cargando, mostramos el componente de carga
  if (isLoading) {
    return (
      <TileFace backgroundColor="#4BE9BC">
        <VBlock>
          <LoadingSpinner size={50} />
        </VBlock>
      </TileFace>
    );
  }

  // Si los datos están cargados, mostramos la vista normal
  return (
    <TileFace>
      <VBlock>
        <TextBox>Rendimiento Académico</TextBox>
        <HBlock>
          <TextBox>Promedio Acumulado</TextBox>
          <TextBox>Promedio Semestral</TextBox>
        </HBlock>
        
        <HBlock>
          <VBlock>
            <PieChart
              data={dataAcumulado}
              startAngle={0}
              lengthAngle={360}
              lineWidth={20}
              label={() => `${promedioAcumulado}`}
              labelStyle={{ fontSize: '20px', fontFamily: 'sans-serif' }}
              labelPosition={0} // Position the label in the center
            />
          </VBlock>

          <VBlock>
            <PieChart
              data={dataSemestral}
              startAngle={0}
              lengthAngle={360}
              lineWidth={20}
              label={() => `${promedioSemestral}`}
              labelStyle={{ fontSize: '20px', fontFamily: 'sans-serif' }}
              labelPosition={0} // Position the label in the center
            />
          </VBlock>
        </HBlock>
        
        <HBlock>
          <HBlock>
            <SvgBox color={getColor(estadoAcumulado)} maxSize={25}>
              {getIcon(estadoAcumulado)}
            </SvgBox>
            <TextBox>{estadoAcumulado}</TextBox>
          </HBlock>
          <HBlock>
            <SvgBox color={getColor(estadoSemestral)} maxSize={25}>
              {getIcon(estadoSemestral)}
            </SvgBox>
            <TextBox>{estadoSemestral}</TextBox>
          </HBlock>
        </HBlock>
      </VBlock>
    </TileFace>
  );
}

