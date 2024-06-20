import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { validateGrade } from '../../../utils/semester-grades';
import { validateGradeType } from '../../../utils/validations';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@import': "url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap')",
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 20,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for better visual appearance
    marginBottom: theme.spacing(3),
    border: `3px solid #1d1d1b`, // Black border
    backgroundColor: '#ffffff', // White background for the card
    display: 'flex', 
    alignItems: 'center', // Center vertically
    textAlign: 'left', // Align text to the left
    fontFamily: 'Quicksand, sans-serif', // Apply Quicksand font
  },
  gradeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  gradeInput: {
    textAlign: 'center',
    marginRight: theme.spacing(1),
    fontWeight: '700',
  },
  iconButton: {
    padding: 5,
    color: '#000000',
  },
  text: {
    textAlign: 'left', // Align text to the left
    color: '#000000',
    fontWeight: '700',
  },
  blueCard: {
    backgroundColor: '#ffffff', // White background for blue cards
    border: `3px solid #1d1d1b`, // Black border for blue cards
    color: '#000000',
  },
  greenCard: {
    backgroundColor: '#ffffff', // White background for green cards
    border: '3px solid', // Border for green cards
    borderImage: 'linear-gradient(to right, #1d1d1b, #d10a11) 1', // Gradient border
    color: '#000000',
    borderRadius: 20, // Rounded corners for green cards
  },
  title: {
    fontSize: '17px',
    color: '#000000',
    marginBottom: theme.spacing(1),
    fontWeight: '700',
    textAlign: 'left', // Align text to the left
  },
}));

export default function CardComponent({ title, grade, weight, text, updateQualifications, updateLock, canLock = true, cardType }) {
  const classes = useStyles();
  const [editGrade, setEditGrade] = useState('');
  const [previousGrade, setPreviousGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const gradeContent = validateGradeType(grade);
    if (typeof gradeContent === 'number') {
      setEditGrade(parseFloat(gradeContent).toFixed(1));
    } else {
      setEditGrade(gradeContent ? gradeContent.toString() : '-');
    }
  }, [grade]);

  const handleGradeChange = (newValue) => {
    if (!isLocked) {
      const validatedGrade = validateGrade(newValue);

      if (validatedGrade !== null) {
        setEditGrade(newValue);
        updateQualifications(parseFloat(newValue));
        if (newValue !== previousGrade.toString()) {
          setPreviousGrade(newValue);
        }
      } else if (newValue === "") {
        setEditGrade("0");
        updateQualifications(0);
      }
    }
  };

  const increaseGrade = () => {
    const newValue = parseFloat(editGrade) + 0.1;
    handleGradeChange(newValue.toFixed(1));
  };

  const decreaseGrade = () => {
    const newValue = parseFloat(editGrade) - 0.1;
    handleGradeChange(newValue.toFixed(1));
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    updateLock(!isLocked);
  };

  const displayGrade = () => {
    const gradeValue = parseFloat(editGrade);
    return isNaN(gradeValue) ? '-' : gradeValue.toFixed(1);
  };

  if (!weight) return null;

  return (
    <Paper className={`${classes.paper} ${cardType === 'blue' ? classes.blueCard : cardType === 'green' ? classes.greenCard : ''}`}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" className={classes.text}>{text}</Typography>
        </Grid>
        <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Typography variant="h6" style={{ margin: '0 8px', fontWeight: '700', textAlign: 'center' }}>
              {displayGrade()}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <IconButton className={classes.iconButton} onClick={increaseGrade} disabled={isLocked}>
                <ArrowDropUpIcon style={{ color: '#000000' }} />
              </IconButton>
              <IconButton className={classes.iconButton} onClick={decreaseGrade} disabled={isLocked}>
                <ArrowDropDownIcon style={{ color: '#000000' }} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            {canLock && (
              <IconButton className={classes.iconButton} onClick={toggleLock}>
                {isLocked ? <LockIcon style={{ color: '#000000' }} /> : <LockOpenIcon style={{ color: '#000000' }} />}
              </IconButton>
            )}
          </Grid>
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
};



