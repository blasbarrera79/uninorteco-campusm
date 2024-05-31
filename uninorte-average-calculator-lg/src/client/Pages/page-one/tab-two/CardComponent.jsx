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
  paper: {
    padding: theme.spacing(2),
    borderRadius: 20,
    boxShadow: 'none',
    marginBottom: theme.spacing(1),
    minHeight: '80px', // Reduced height
  },
  gradeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  gradeInput: {
    textAlign: 'center',
    width: '4em',
    marginRight: theme.spacing(1),
  },
  iconButton: {
    padding: 5,
    color: '#000000', // black icon color
  },
  text: {
    textAlign: 'left', // Align text to the left
    color: '#ffffff', // White text color
  },
  blueCard: {
    backgroundColor: '#6FA1D2', // Light blue background
    color: '#ffffff', // White text color
  },
  greenCard: {
    backgroundColor: '#e0f7fa', // Light green background
    color: '#000000', // White text color
  },
  
  title: {
    fontSize: '17px', // Set the font size to 17px
    color: '#ffffff', // White text color
    marginBottom: theme.spacing(1), // Adjust margin if necessary
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
      setEditGrade(gradeContent.toString());
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

  if (!weight) return null;

  return (
    <Paper className={`${classes.paper} ${cardType === 'blue' ? classes.blueCard : cardType === 'green' ? classes.greenCard : ''}`}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>
            {title}
          </Typography>
          <Typography variant="body2" >{text}</Typography>
        </Grid>
        <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Typography variant="h6"  style={{ margin: '0 8px' }}>
              {parseFloat(editGrade).toFixed(1)}
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
                {isLocked ? <LockIcon style={{ color: '#ffffff' }} /> : <LockOpenIcon style={{ color: '#ffffff' }} />}
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
