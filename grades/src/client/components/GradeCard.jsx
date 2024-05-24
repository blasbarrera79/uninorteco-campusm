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
  console.log('GradeCard', items);

  useEffect(() => {
    let finalGrade = 0;
    items.forEach((item) => { 
      const gradeNumber = parseFloat(item.value);
      const parcialGrade = (item.peso / 100) * gradeNumber;
      finalGrade += parcialGrade;
    });
    console.log('GradeCard2', finalGrade);
    setNotaFinal(finalGrade.toFixed(1).toString());
  }, [items]);
  
  console.log('typeof notaFinal', typeof notaFinal);
  return (
    <Card className={classes.card}>
      <GradeHeader gradeName={gradeName} finalGrade={notaFinal} />
      <CardContent className={classes.cardContent}>
        <GradeTable items={items} />
      </CardContent>
    </Card>
  );
};

GradeCard.propTypes = {
  gradeName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default GradeCard;
