import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { validateGradeType } from '../../../utils/validations';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 0,
    borderRadius: 12,
    boxShadow: 'none',
    marginBottom: theme.spacing(1),
    borderRadius: 12, // Rounded border
  },
  header: {
    padding: theme.spacing(2),
    color: '#000000', // Black text color
    borderRadius: '12px 12px 0 0', // Rounded top corners
  },
  content: {
    padding: theme.spacing(2),
    backgroundColor: '#f0f0f0', // Light grey background for the content
    color: '#000000', // Black text color for the content
    borderRadius: '0 0 12px 12px', // Rounded bottom corners
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
  blueCard: {
    backgroundColor: '#7ec1ee', // Light blue background
  },
  greenCard: {
    backgroundColor: '#6FA1D2', // Light green background
  },
}));

export default function CardComponent({ title, grade, credit, text, partial = [{}], parcelation = true, cardType }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleParcelacionClick = () => {
    navigate('/partial', { state: { datos: partial } });
  };

  const gradeContent = validateGradeType(grade);
  const formattedGrade = typeof grade === 'number' ? grade.toFixed(1) : grade;

  if (partial) {
    if (partial.length <= 1) {
      parcelation = false;
    }
  }

  return (
    <Paper className={`${classes.paper} ${cardType === 'blue' ? classes.blueCard : cardType === 'green' ? classes.greenCard : ''}`}>
      <div className={`${classes.header} ${cardType === 'blue' ? classes.blueCard : cardType === 'green' ? classes.greenCard : ''}`}>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
      </div>
      <div className={classes.content}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              {credit > 0 && (
                <Grid item>
                  <Typography variant="body2">Creditos: {credit}</Typography>
                </Grid>
              )}
            </Grid>
            {parcelation && (
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer' }}
                  onClick={handleParcelacionClick}
                >
                  Ver parcelacion
                </Typography>
              </Grid>
            )}
            {text && (
              <Grid item>
                <Typography variant="body2">{text}</Typography>
              </Grid>
            )}
          </Grid>
          <Grid item className={classes.grade}>
            <Typography variant="body1" className={classes.gradeInput}>
              {formattedGrade}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  grade: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  credit: PropTypes.number,
  text: PropTypes.string,
  partial: PropTypes.array,
  parcelation: PropTypes.bool,
  cardType: PropTypes.string, // new prop
};
