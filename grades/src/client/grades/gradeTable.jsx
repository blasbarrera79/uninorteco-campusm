import React from 'react';
import { Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';

const GradeTable = ({ items }) => {
  return (
      <Table>
        <TableBody>
          {items.length>0 ? items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          )):
            <TableRow>
                <TableCell>
                <Typography>No hay calificaciones</Typography>
                </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
  );
};

export default GradeTable;