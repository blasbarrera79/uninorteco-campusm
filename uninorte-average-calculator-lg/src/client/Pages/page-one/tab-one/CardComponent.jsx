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

export default function CardComponent({ title, grade, credit, text , partial = [{}], parcelation = true}) {

  const classes = useStyles();
  console.log("partial ",partial);

  const navigate = useNavigate();

  const handleParcelacionClick = () => {
    navigate('/partial', { state: { datos: partial } });
  };

  const gradeContent = validateGradeType(grade);
  console.log('partial ',partial)
  console.log('partial.length ',partial.length)
  if (partial) {
    if (partial.length <= 1) {
      parcelation = false;
    }
  }

  console.log("grade typeOf ",typeof grade);
  console.log("grade ",grade);
  console.log("gradeContent ",gradeContent);

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
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
          )
          }
          {text && (
            <Grid className={classes.text} item>
              <Typography variant="body2">{text}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item className={classes.grade}>
          <Typography variant="body1" className={classes.gradeInput}>
            {gradeContent}
          </Typography>

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
  partial: PropTypes.array,
  parcelation: PropTypes.bool,
};
