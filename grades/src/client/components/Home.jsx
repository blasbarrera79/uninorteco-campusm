/* eslint-disable react/no-array-index-key */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// nimport { request } from "@ombiel/aek-lib";
import Container from "@material-ui/core/Container";
import GradeCard from "./GradeCard";
// for a server action located at `/src/server/dosomething.action.twig`

const useStyles = makeStyles({
  container: {
    padding:'0',
  },
});

export default function Screen() {
  const [subjectsGrades, setSubjectsGrades] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const notas = async (NRC) => {
      try {
        const response = await fetch(
          "https://intunqa.uninorte.edu.co/sba-estudiantes/api/v1/notas-parciales",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: "vergaradl",
              nrc: NRC,
              periodo: "202310",
            }),
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const matricula = async () => {
      try {
        const response = await fetch(
          "https://intunqa.uninorte.edu.co/sba-estudiantes/api/v1/matricula/user/vergaradl/periodo/202310"
        );
        const data = await response.json();
        console.log(data.resultado);

        data.resultado.forEach(async (element) => {
          const res = await notas(element.SFRSTCR_CRN);
          console.log(res.resultado);

          setSubjectsGrades((prevState) => [
            ...prevState,
            {
              materia: element.SSBSECT_CRSE_TITLE,
              items: res.resultado.map((item) => ({
                name: item.SHRGCOM_NAME,
                value: item.NOTA,
              })),
            },
          ]);
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    matricula();
  }, []);

  /*  request.action("get-user")
  .send({ user: "vergaradl", nrc: "2217", periodo: "202310" }) // Envía los parámetros al backend
  .end((err, res) => {
    console.log(err);
    console.log(res);
  });*/

  return (
    <Container className={classes.container}>
      {subjectsGrades
        && subjectsGrades.map((subjectGrade, index) => (
          <GradeCard
            key={index}
            gradeName={subjectGrade.materia}
            items={subjectGrade.items}
          />
        ))}
    </Container>
  );
}
