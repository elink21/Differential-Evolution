import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
    root: {
        width: "auto",
    },
});

function valuetext(value) {
    return `${value}°C`;
}

const MySlider = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState([0, 5]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Rango de generacion
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={-10}
                max={10}
                marks
                step={1}
            />
        </div>
    );
}

export default MySlider;