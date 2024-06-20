import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { validateGradeType } from '../../../utils/validations';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '@font-face': {
      fontFamily: 'Quicksand',
      src: `url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap') format('woff2')`,
    },
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 12,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for better visual appearance
    marginBottom: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`, // Border for the paper
  },
  header: {
    padding: theme.spacing(2),
    backgroundColor: '#444444', // Dark grey background color for the header
    color: '#ffffff', // White text color for the header
    borderRadius: '12px 12px 0 0', // Rounded top corners
    fontFamily: 'Quicksand', // Font family
    fontWeight: '700', // Bold font
  },
  content: {
    padding: theme.spacing(2),
    backgroundColor: '#f7f7f7', // Light grey background for the content
    color: '#1d1d1b', // Black text color for the content
    borderRadius: '0 0 12px 12px', // Rounded bottom corners
    fontFamily: 'Quicksand', // Font family
    fontWeight: '700', // Bold font
  },
  grade: {
    alignSelf: 'center',
    width: '6em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1d1d1b', // Black text color for the grade
    fontFamily: 'Quicksand', // Font family
    fontWeight: '700', // Bold font
  },
  gradeInput: {
    textAlign: 'center',
    fontFamily: 'Quicksand', // Font family
    fontWeight: '700', // Bold font
  },
  defaultCard: {
    backgroundColor: '#ffffff', // White background for default cards
    border: '1px solid #cccccc', // Light grey border
  },
  highlightCard: {
    background: 'linear-gradient(to right, #1d1d1b, #d10a11)', // Gradient background for highlight cards
    color: '#ffffff', // White text color
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
    <Paper className={`${classes.paper} ${cardType === 'highlight' ? classes.highlightCard : classes.defaultCard}`}>
      <div className={`${classes.header}`}>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
      </div>
      <div className={classes.content}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {credit > 0 && (
                <Typography variant="body2">Créditos: {credit}</Typography>
              )}
            </Grid>
            {parcelation && (
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: 'pointer', color: '#d10a11', fontWeight: '700' }} // Red color for the text
                  onClick={handleParcelacionClick}
                >
                  Ver parcelación
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
  cardType: PropTypes.string,
};


