import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import GradeHeader from "./CardHeader";
import GradeTable from "./GradeTable";

const useStyles = makeStyles({
  card: {
    borderRadius: '15px',
    margin: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  cardContent: {
    padding: "0",
    "&:last-child": {
      paddingBottom: "unset",
    },
  },
});

const GradeCard = ({ gradeName, items }) => {
  const classes = useStyles();
  const [notaFinal, setNotaFinal] = useState(0);

  useEffect(() => {
    const calculateFinalGrade = () => {
      let finalGrade = items.reduce((acc, item) => {
        const gradeNumber = parseFloat(item.value);
        const parcialGrade = (item.peso / 100) * gradeNumber;
        return acc + parcialGrade;
      }, 0);

      // Apply rounding logic
      const roundedGrade = Math.round(finalGrade * 10) / 10;
      setNotaFinal(roundedGrade.toFixed(1));
    };

    calculateFinalGrade();
  }, [items]);

  return (
    <Card className={classes.card}>
      <GradeHeader gradeName={gradeName} finalGrade={notaFinal} />
      <CardContent className={classes.cardContent}>
        <GradeTable items={items} />
      </CardContent>
    </Card>
  );
};



export default GradeCard;
