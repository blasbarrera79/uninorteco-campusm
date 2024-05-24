import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import GradeCard from "./GradeCard";
import SelectComponent from "./SelectComponent";
import { fetchUserData, fetchUserTerms, fetchUserGrades } from "../utils/apiUtils";

const useStyles = makeStyles({
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
        const username = await fetchUserData();
        setUser(username);
      } catch (err) {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchTerms = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const termsResponse = await fetchUserTerms(user);
          setTerms(termsResponse);
          setSelectedTerm(termsResponse[0]?.PERIODO || '');
        } catch (err) {
          setIsLoading(false);
        }
      }
    };
  
    fetchTerms();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const subjectsGradesResponse = await fetchUserGrades(selectedTerm, user);
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
    <Container>
      <SelectComponent
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
            className={classes.container}
          />
        ))
      )}
    </Container>
  );
};

export default Screen;
