import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GradeCard from "./GradeCard";
import SelectComponent from "./SelectComponent";
import { getRegistration } from "../services/registrationService";
import { getGrades } from "../services/gradeService";
import { Typography, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: "0",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
});

const Screen = () => {
  const [subjectsGrades, setSubjectsGrades] = useState([]);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loader
  const classes = useStyles();

  const options = [
    { value: "202330", label: "202330" },
    { value: "202410", label: "202410" },
    { value: "202411", label: "202411" },
    { value: "202400", label: "202400" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Mostrar loader al iniciar la carga de datos
      try {
        const registration = await getRegistration();
        const promises = registration.map(async (element) => {
          const grades = await getGrades(element.SFRSTCR_CRN);
          return {
            materia: element.SSBSECT_CRSE_TITLE,
            items: grades.map((item) => ({
              name: item.SHRGCOM_NAME,
              value: item.NOTA,
            })),
          };
        });

        const subjectsGrades = await Promise.all(promises);
        setSubjectsGrades(subjectsGrades);
        setIsLoading(false); // Ocultar loader cuando se completa la carga de datos
      } catch (error) {
        setIsLoading(false); // Ocultar loader en caso de error
        setError(error);
      }
    };

    fetchData();
  }, [selectedValue]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Container className={classes.container}>
      <SelectComponent
        label="Selecciona una opción"
        value={selectedValue}
        onChange={handleSelectChange}
        options={options}
      />
      {/* Mostrar loader si isLoading es true */}
      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        // Mostrar contenido cuando isLoading es false
        subjectsGrades.map((subjectGrade, index) => (
          <GradeCard
            key={index}
            gradeName={subjectGrade.materia}
            items={subjectGrade.items}
          />
        ))
      )}
      <Typography>{error}</Typography>
    </Container>
  );
};

export default Screen;
