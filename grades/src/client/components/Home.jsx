import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GradeCard from "./GradeCard";
import SelectComponent from "./SelectComponent";
import { getRegistration } from "../services/registrationService";
import { getGrades } from "../services/gradeService";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    padding: "0",
  },
});

const Screen = () => {
  const [subjectsGrades, setSubjectsGrades] = useState([]);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registration = await getRegistration();
        const promises = registration.map(async (element) => {
          const grades = await getGrades(element.SFRSTCR_CRN);
          console.log(grades);
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
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className={classes.container}>
      {subjectsGrades.map((subjectGrade, index) => (
        <GradeCard
          key={index}
          gradeName={subjectGrade.materia}
          items={subjectGrade.items}
        />
      ))}
      <Typography>{error}</Typography>
    </Container>
  );
};

export default Screen;
