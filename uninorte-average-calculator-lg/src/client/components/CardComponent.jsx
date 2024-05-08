import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  grade: {
    alignSelf: 'center',
    width: '4em',
  },
}));

export default function CardComponent({ title, grade, credit, parcelacion = true, text }) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h5">
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
              <Typography variant="body2" style={{ cursor: 'pointer' }}>
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
          <TextField value={grade} />
        </Grid>
      </Grid>
    </Paper>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  credit: PropTypes.number,
  parcelacion: PropTypes.bool,
  text: PropTypes.string,
};

