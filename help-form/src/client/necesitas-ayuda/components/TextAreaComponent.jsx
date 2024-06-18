import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Label from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
input: {
width: '100%',
borderRadius: '4px',
backgroundColor: '#f5f5f5',
borderColor: '#1d1d1b',
padding: theme.spacing(1),
fontFamily: 'Quicksand, sans-serif',
color: '#1d1d1b', // Añadir el color del texto aquí
resize: 'none', 
},
label: {
color: '#d10a11',
fontWeight: 'bold',
fontSize: '1rem',
fontFamily: 'Quicksand, sans-serif',
marginBottom: theme.spacing(1),
},
text: {
fontWeight: 'bold',
color: '#1d1d1b',
}
}));

const TextAreaComponent = ({ label, name, value, onChange }) => {
const classes = useStyles();

return (
<>
<Label className={classes.label}>{label}</Label>
<TextareaAutosize
     className={classes.input}
     aria-label={label}
     minRows={5}
     maxRows={5}
     name={name}
     value={value}
     onChange={onChange}
   />
</>
);
};

TextAreaComponent.propTypes = {
label: PropTypes.string.isRequired,
name: PropTypes.string.isRequired,
value: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
};

export default TextAreaComponent;







