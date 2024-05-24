import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  gradeCell: {
    textAlign: "end",
    fontSize: "1em",
  },
  tableFontSize: {
    fontSize: "1em",
  },
  tableRow: {
    transition: "background-color 0.3s ease",
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    "&:hover": {
      backgroundColor: "#e0f7fa",
    },
  },
  noGrades: {
    textAlign: "center",
    padding: "16px",
  },
});

const GradeTable = ({ items }) => {
  const classes = useStyles();

  return (
    <Table>
      <TableBody>
        {items.length > 0 ? (
          items.map((item) => (
            <TableRow key={item.name} className={classes.tableRow}>
              <TableCell className={classes.tableFontSize}>{item.name}</TableCell>
              <TableCell className={classes.gradeCell}>{item.value}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className={classes.noGrades}>
              <Typography>No hay calificaciones</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

GradeTable.propTypes = {
  items: PropTypes.array.isRequired,
};

export default GradeTable;
