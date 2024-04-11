import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { request } from "@ombiel/aek-lib";
import Container from "@material-ui/core/Container";
import GradeCard from "./gradesCard";
// for a server action located at `/src/server/dosomething.action.twig`

const useStyles = makeStyles({
  container: {},
});

export default function Screen() {
  const [subjectsGrades, setSubjectsGrades] = React.useState([
    {
      materia: "Matemáticas",
      items: [
        { name: "Parcial 1", value: 4 },
        { name: "Parcial 2", value: 3 },
        { name: "Parcial 3", value: 2 },
      ],
    },
    {
      materia: "Lenguas",
     items: [ 
      ],
    },
    {
      materia: "Algoritmia",
      items: [
        { name: "Parcial 1", value: 3 },
        { name: "Parcial 2", value: 2 },
        { name: "Parcial 3", value: 1 },
        { name: "Parcial 1", value: 3 },
        { name: "Parcial 2", value: 2 },
        { name: "Parcial 3", value: 1 },
      ],
    },
  ]);
  const classes = useStyles();

  // console.log("useEffect");
  // request.action('get-user')
  //   .end((e, res) => {
  //     console.log('error', e);
  //     console.log('res', res.body.resultado);
  //     setExams(res.body.resultado);
  //   });

  console.log("subjectsGrades", subjectsGrades);
  return (
    <Container className={classes.container}>
      {subjectsGrades &&
        subjectsGrades.map((subjectGrade, index) => (
          <GradeCard
            key={index}
            gradeName={subjectGrade.materia}
            items={subjectGrade.items}
          />
        ))}
    </Container>
  );
}
