import React from "react"
import { Typography, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  fecha: {
    display: "flex",
    justifyContent: "spaceBetween",
    alignItems: "center",
    fontSize: "24px" /* Tamaño del número del día */,
  },

  numeroDia: {
    fontSize: "36px" /* Tamaño del número del día grande */,
  },

  mesAno: {
    textAlign: "start",
    marginLeft: "1rem",
  },

  dayName: {
    fontSize: "18px" /* Tamaño del mes */,
  },

  dia: {
    fontSize: "18px" /* Tamaño del año */,
  },

  dividerMarginTop: {
    marginTop: "0",
  },
})

const HeaderComponent = (props) => {
  const { day, month, year, dayName } = props
  const classes = useStyles()

  return (
    <>
      <div className={classes.fecha}>
        <div className={classes.numeroDia}>{day}</div>
        <div className={classes.mesAno}>
          <div className={classes.dayName}>{dayName}</div>
          <div className={classes.dia}>
            <Typography>
              {month},{year}
            </Typography>
          </div>
        </div>
      </div>
      <Divider className={classes.dividerMarginTop} />
    </>
  )
}

export default HeaderComponent
