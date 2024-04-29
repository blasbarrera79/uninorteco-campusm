import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import GradeCard from "./GradeCard";
import SelectComponent from "./SelectComponent";
import { getRegistration } from "../services/registrationService";
import { getGrades } from "../services/gradeService";
import { getTerm } from "../services/termService";
import { getUser } from "../services/userService";

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
  const classes = useStyles();
  const [subjectsGrades, setSubjectsGrades] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const termsResponse = await getTerm();
        setTerms(termsResponse);
        setSelectedTerm(termsResponse[0]?.PERIODO || '');
        const userResponse = await getUser();
        setUser(userResponse);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const registration = await getRegistration(selectedTerm);
        const promises = registration.map(async (element) => {
          const grades = await getGrades(user, element.SFRSTCR_CRN, selectedTerm);
          return {
            materia: element.SSBSECT_CRSE_TITLE,
            items: grades.map(({ SHRGCOM_NAME, NOTAA }) => ({ name: SHRGCOM_NAME, value: NOTAA })),
          };
        });

        const subjectsGradesResponse = await Promise.all(promises);
        setSubjectsGrades(subjectsGradesResponse);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    if (selectedTerm && user) {
      fetchData();
    }
  }, [selectedTerm, user]);

  const handleSelectChange = (event) => {
    setSelectedTerm(event.target.value);
  };

  return (
    <Container className={classes.container}>
      <SelectComponent
        label="Selecciona una opción"
        value={selectedTerm}
        onChange={handleSelectChange}
        options={terms}
      />
      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress />
        </div>
      ) : (
        subjectsGrades.map((subjectGrade) => (
          <GradeCard
            key={subjectGrade.materia}
            gradeName={subjectGrade.materia}
            items={subjectGrade.items}
          />
        ))
      )}
    </Container>
  );
};

export default Screen;
