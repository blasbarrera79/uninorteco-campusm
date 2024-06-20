import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { validateGradeType } from '../../../utils/validations';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@import': "url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap')",
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: theme.spacing(3),
    border: `1px solid #ddd`,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    fontFamily: 'Quicksand, sans-serif',
    color: '#1d1d1b',
  },
  gradeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  gradeInput: {
    textAlign: 'center',
    marginRight: theme.spacing(1),
    fontWeight: '700',
    fontSize: '1.2rem',
    width: '50px',
    border: '1px solid #ddd',
    borderRadius: 5,
    padding: '5px',
    backgroundColor: '#f5f5f5',
  },
  iconButton: {
    padding: 5,
    color: '#1d1d1b',
  },
  text: {
    textAlign: 'left',
    color: '#1d1d1b',
    fontWeight: '700',
  },
  blueCard: {
    border: `1px solid #ddd`,
  },
  greenCard: {
    border: '1px solid #4caf50',
  },
  title: {
    fontSize: '1rem',
    color: '#d10a11',
    fontWeight: '700',
    textAlign: 'left',
  },
}));

function CardComponent({ title, grade, weight, text, updateQualifications, updateLock, canLock = true, cardType }) {
  const classes = useStyles();
  const [currentGrade, setCurrentGrade] = useState(grade);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setCurrentGrade(grade);
  }, [grade]);

  const handleChange = (event) => {
    const newGrade = event.target.value;
    if (validateGradeType(newGrade)) {
      setCurrentGrade(newGrade);
      updateQualifications(newGrade);
    }
  };

  const handleLock = () => {
    setIsLocked(!isLocked);
    updateLock();
  };

  return (
    <Paper className={`${classes.paper} ${cardType === 'blue' ? classes.blueCard : classes.greenCard}`}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={6} className={classes.text}>
          <Typography className={classes.title}>
            {title} ({weight} Créditos)
          </Typography>
          {text && (
            <Typography variant="body2" className={classes.text}>
              {text}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6} className={classes.gradeContainer}>
          <input
            className={classes.gradeInput}
            type="text"
            value={currentGrade}
            onChange={handleChange}
            readOnly={isLocked}
          />
          {canLock && (
            <IconButton className={classes.iconButton} onClick={handleLock}>
              {isLocked ? <LockIcon /> : <LockOpenIcon />}
            </IconButton>
          )}
          {!canLock && (
            <Typography className={classes.title}>
              (Desbloqueado)
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  weight: PropTypes.number.isRequired,
  text: PropTypes.string,
  updateQualifications: PropTypes.func.isRequired,
  updateLock: PropTypes.func.isRequired,
  canLock: PropTypes.bool,
  cardType: PropTypes.oneOf(['blue', 'green']),
};

CardComponent.defaultProps = {
  text: '',
  canLock: true,
  cardType: 'blue',
};

export default CardComponent;











