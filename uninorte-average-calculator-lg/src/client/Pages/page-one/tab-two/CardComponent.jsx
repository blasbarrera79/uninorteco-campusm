import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'; 
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 0,
    boxShadow: 'none',
  },
  grade: {
    alignSelf: 'center',
    width: '6em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeInput: {
    textAlignLast: 'center',
  },
  text: {
    maxWidth: '80%',
  },
}));

export default function CardComponent({ title, grade, credit, parcelacion = true, text, edit = false, partial, updateQualifications }) {
  const classes = useStyles();
  const [editGrade, setEditGrade] = useState('');
  const [previousGrade, setPreviousGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setEditGrade(grade.toString()); // Convertir el grade a string al iniciar
  }, [grade]);

  const handleGradeChange = (event) => {
    if (!isLocked) {
      let newValue = event.target.value.trim();
      if (newValue === '') {
        newValue = '0';
      }
      if (/^-?\d*(\.\d{0,2})?$/.test(newValue) && newValue >= 0 && newValue <= 5) {

        if (newValue.endsWith('.00')) {
          newValue = newValue.replace('.00', '');
        }

        setEditGrade(newValue);
        updateQualifications(parseFloat(newValue));
        if (newValue !== previousGrade.toString()) {
          setPreviousGrade(newValue);
        }
      }
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            {credit && (
              <Grid item>
                <Typography variant="body2">Creditos: {credit}</Typography>
              </Grid>
            )}
          </Grid>
          {parcelacion && (
            <Grid item>
              <Link to={{ pathname: "/partial" , state: { datos: partial } }} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Ver parcelacion
                </Typography>
              </Link>       
            </Grid>
          )}
          {text && (
            <Grid className={classes.text} item>
              <Typography variant="body2">{text}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item className={classes.grade}>
          {edit ? (
            <>
              <TextField 
                className={classes.gradeInput} 
                type="text" 
                value={editGrade} 
                onChange={handleGradeChange} 
                disabled={isLocked}
              />
              <IconButton onClick={toggleLock}>
                {isLocked ? <LockIcon /> : <LockOpenIcon />}
              </IconButton>
            </>
          ) : (
            <Typography className={classes.gradeInput} variant="body1">{grade}</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  credit: PropTypes.number,
  parcelacion: PropTypes.bool,
  text: PropTypes.string,
  edit: PropTypes.bool,
  partial: PropTypes.array,
  updateQualifications: PropTypes.func,
};
