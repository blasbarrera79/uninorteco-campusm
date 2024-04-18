import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "@ombiel/aek-lib";
import Container from "@material-ui/core/Container";
import SimpleCard from "./Card";
import Typography from "@material-ui/core/Typography";
// for a server action located at `/src/server/dosomething.action.twig`

const useStyles = makeStyles({
  container: {},
});

export default function Home() {
  const [exams, setExams] = React.useState([]);
  const classes = useStyles();

  request.action("get-user").end((e, res) => {
    setExams(res.body.resultado);
  });

  return (
    <Container className={classes.container}>
      {exams==[] ? (
        exams.map((exam, index) => {
          return (
            <SimpleCard
              key={index}
              title={exam.DESCRIPCION}
              hour={exam.HORA}
              teacher={exam.PROFESOR}
              place={exam.LUGAR}
            />
          );
        })
      ) : (
        <Typography>No tienes examenes finales disponibles</Typography>
      )}
    </Container>
  );
}
