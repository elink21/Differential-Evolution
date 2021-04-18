import React from 'react';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab';
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import MySlider from './Slider'

const Inputs = () => {


    return (
        <Box id="inputs" boxShadow={2}>

            <TextField InputProps={{
                readOnly: true,
            }} size="small" defaultValue="0.5" id="textInput" label="Valor de μ" variant="outlined" />

            <TextField InputProps={{
                readOnly: true,
            }} size="small" defaultValue="0.5" id="textInput" label="Valor de CR" variant="outlined" />

            <TextField size="small" type="number" defaultValue="4" id="textInput" label="Generaciones" variant="outlined" />

            <TextField size="small" type="number" defaultValue="4" id="textInput" label="Poblacion" variant="outlined" />

            <MySlider />

            <Fab id="playButton" color="primary" aria-label="add">
                <PlayArrowSharpIcon />
            </Fab>

        </Box>
    );

}

export default Inputs;