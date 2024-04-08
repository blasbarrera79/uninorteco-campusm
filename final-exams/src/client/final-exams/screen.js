import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "@ombiel/aek-lib";
import Container from "@material-ui/core/Container";
import SimpleCard from "./Card";
// for a server action located at `/src/server/dosomething.action.twig`


const useStyles = makeStyles({
  container: {},
});

export default function Screen() {
  const [exams, setExams] = React.useState([]);
  const classes = useStyles();

  console.log("useEffect");
  request.action('get-user')
    .end((e, res) => {
      console.log('error', e);
      console.log('res', res.body.resultado);
      setExams(res.body.resultado);
    });

  return (
    <Container className={classes.container}>

      {exams.map((exam, index) => {
        return (
          <SimpleCard
            key={index}
            title={exam.DESCRIPCION}
            hour={exam.HORA}
            teacher={exam.PROFESOR}
            place={exam.LUGAR}
          />
        );
      })}
    </Container>
  );
}