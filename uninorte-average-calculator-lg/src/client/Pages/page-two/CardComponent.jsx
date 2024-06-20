import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import TextField from '@material-ui/core/TextField';
import { validateGrade } from '../../utils/semester-grades';
import { validateGradeType } from '../../utils/validations';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    borderRadius: 20,
    boxShadow: 'none',
    marginBottom: theme.spacing(1),
    fontFamily: 'Quicksand, sans-serif',
    backgroundColor: '#f2f2f2', // Light gray background
    color: '#1d1d1b', // Dark gray text color
  },
  grade: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeInput: {
    textAlign: 'center',
    color: '#d10a11', // Dark gray text color
  },
  text: {
    maxWidth: '60%',
    color: '#1d1d1b', // Dark gray text color
  },
  blueCard: {
    borderRadius: 20,
    borderColor: '#1d1d1b',
    border: '3px solid #ddd',
    backgroundColor: '#ffffff', // Light blue background
    color: '#1d1d1b', // Dark gray text color
  },
  greenCard: {
    borderRadius: 20,
    borderColor: '#1d1d1b',
    border: '3px solid #ddd',
    backgroundColor: '#ffffff', // Light green background
    color: '#1d1d1b', // Dark gray text color
  },
}));

export default function CardComponent({ title, grade, weight, text, updateQualifications, updateLock, canLock = true, cardType, gradeInputWidth }) {
  const classes = useStyles();
  const [editGrade, setEditGrade] = useState('');
  const [previousGrade, setPreviousGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const gradeContent = validateGradeType(grade);
    setEditGrade(parseFloat(gradeContent).toFixed(1));
  }, [grade]);

  const handleGradeChange = (event) => {
    if (!isLocked) {
      const newValue = event.target.value;
      const validatedGrade = validateGrade(newValue);

      if (validatedGrade !== null) {
        setEditGrade(parseFloat(newValue).toFixed(1));
        updateQualifications(parseFloat(newValue));
        if (newValue !== previousGrade.toString()) {
          setPreviousGrade(newValue);
        }
      } else if (newValue === "") {
        setEditGrade(''); // Clear input if empty string
        updateQualifications(0); // Update qualifications with 0 if empty string
      }
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    updateLock(!isLocked);
  };

  return (
    <Paper className={`${classes.paper} ${cardType === 'blue' ? classes.blueCard : cardType === 'green' ? classes.greenCard : ''}`}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item xs>
            <Typography gutterBottom variant="h6" className={classes.grade}>
              {title}
            </Typography>
            {weight && (
              <Grid item>
                <Typography variant="body2" className={classes.text}>
                  Porcentaje: {weight} %
                </Typography>
              </Grid>
            )}
          </Grid>
          {text && (
            <Grid item>
              <Typography variant="body2" className={classes.text}>
                {text}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid item className={classes.grade}>
          <TextField
            className={classes.gradeInput}
            style={{ width: gradeInputWidth }}
            type="number"
            value={editGrade}
            onChange={handleGradeChange}
            disabled={isLocked}
            InputProps={{
              style: { textAlign: 'center', color: '#1d1d1b' }, // Dark gray text color
              inputProps: { min: 0, max: 100 },
            }}
          />
          {canLock && (
            <IconButton onClick={toggleLock}>
              {isLocked ? (
                <LockIcon style={{ color: '#1d1d1b' }} />
              ) : (
                <LockOpenIcon style={{ color: '#1d1d1b' }} />
              )}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string,
  weight: PropTypes.number,
  updateQualifications: PropTypes.func.isRequired,
  updateLock: PropTypes.func,
  canLock: PropTypes.bool,
  cardType: PropTypes.string,
  gradeInputWidth: PropTypes.string,
};

CardComponent.defaultProps = {
  gradeInputWidth: '2.5em',
};



