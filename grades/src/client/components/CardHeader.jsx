import React from "react";
import { CardHeader, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  CardHeader: {
    backgroundColor: "#1d1d1b",
    padding: "0",
  },
  table: {
    width: "100%",
  },
  Typography: {
    color: "#FFFFFF",
  },
});

const GradeHeader = ({ gradeName, finalGrade }) => {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.CardHeader}
      title={(
        <Table className={classes.table}> 
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography className={classes.Typography} variant="h6">
                  {gradeName}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {finalGrade > 0 && (
                  <Typography className={classes.Typography} variant="subtitle1">
                    {finalGrade}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    />
  );
};



export default GradeHeader;
