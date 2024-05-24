import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useNavigate } from 'react-router-dom'; 
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { validateGrade } from '../../../my-domain-logic/semester-grades';
import { validateGradeType } from '../../../utils/validations';

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

export default function CardComponent({ title, grade, credit, text, edit = false, partial, updateQualifications,updateLock, canLock = true , parcelation = true }) {
  const classes = useStyles();
  const [editGrade, setEditGrade] = useState('');
  const [previousGrade, setPreviousGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const gradeContent = validateGradeType(grade);
    setEditGrade(gradeContent.toString()); // Convertir el grade a string al iniciar
  }, [grade]);

  const handleGradeChange = (event) => {
    if (!isLocked) {
      const newValue = event.target.value;
      const validatedGrade = validateGrade(newValue);

      if (validatedGrade !== null) {
        setEditGrade(newValue);
        updateQualifications(parseFloat(newValue));
        if (newValue !== previousGrade.toString()) {
          setPreviousGrade(newValue);
        }
      } else if (newValue === "") {
        setEditGrade(0);
        updateQualifications(0);
      }
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    updateLock(!isLocked);
  };


  const navigate = useNavigate();

  const handleParcelacionClick = () => {
    navigate('/partial', { state: { datos: partial } });
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
          {
            parcelation && (
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer' }}
                  onClick={handleParcelacionClick}
                >
                  Ver parcelacion
                </Typography>
              </Grid>
            )
          }
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
              {canLock ? (
                <IconButton onClick={toggleLock}>
                  {isLocked ? <LockIcon /> : <LockOpenIcon />}
                </IconButton>
              ) : null
              }
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
  text: PropTypes.string,
  edit: PropTypes.bool,
  partial: PropTypes.array,
  updateQualifications: PropTypes.func,
  updateLock: PropTypes.func,
  canLock: PropTypes.bool,
  parcelation: PropTypes.bool,
};
