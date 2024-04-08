import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo blanco oscuro con un poco de transparencia
        borderRadius: 10, // Bordes redondeados
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra
        marginTop: 10, // Margen superior
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.hour}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.teacher}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.place}
                </Typography>
            </CardContent>
        </Card>
    );
}