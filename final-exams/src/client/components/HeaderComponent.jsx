import React from "react"
import PropTypes from "prop-types"
import { Typography, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  fecha: {
    display: "flex",
    justifyContent: "spaceBetween",
    alignItems: "center",
    fontSize: "24px",
  },

  numeroDia: {
    fontSize: "36px",
  },

  mesAno: {
    textAlign: "start",
    marginLeft: "1rem",
  },

  dayName: {
    fontSize: "18px",
  },

  dia: {
    fontSize: "18px",
  },

  dividerMarginTop: {
    marginTop: "0",
  },
})

const HeaderComponent = (props) => {
  const { day, month, year, dayName } = props;
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
HeaderComponent.propTypes = {
  day: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  dayName: PropTypes.string.isRequired,
};

export default HeaderComponent
