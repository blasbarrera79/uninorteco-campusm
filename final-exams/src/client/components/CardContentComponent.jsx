import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  centerButton: { alignSelf: "center" },
  endText: { textAlign: "end" },
  card: {
    marginBottom: "1rem",
    background: "lightgray",
  },
  cardContent: {
    marginTop: "-1rem",
  },
})

const CardContentComponent = ({ title, hour, teacher, classRoom }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <CardContent className={classes.cardContent}>
        <Typography>
          <strong>Hora:</strong> {hour}
        </Typography>
        <Typography>
          <strong>Profesor:</strong> {teacher}
        </Typography>
        <Typography>
          <strong>Lugar:</strong> {classRoom}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardContentComponent
