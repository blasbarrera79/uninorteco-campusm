import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  GradeCell: {
    textAlign: "end",
    fontSize: "1em",
  },
  TableFontSize: {
    fontSize: "1em",
  },
});

const GradeTable = ({ items }) => {
  const classes = useStyles();

  return (
    <Table>
      <TableBody>
        {items.length > 0 ? (
          items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className={classes.TableFontSize}>{item.name}</TableCell>
              <TableCell className={classes.GradeCell}>{item.value}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>
              <Typography>No hay calificaciones</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GradeTable;
