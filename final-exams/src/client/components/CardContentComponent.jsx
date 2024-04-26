import React from "react"
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core"

const useStyles = makeStyles({
  centerButton: { alignSelf: "center" },
  endText: { textAlign: "end" },
  card: {
    marginBottom: "1rem",
    background: "#7EC0EE",
    color: "white",
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

CardContentComponent.propTypes = {
  title: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  classRoom: PropTypes.string.isRequired,
}

export default CardContentComponent
