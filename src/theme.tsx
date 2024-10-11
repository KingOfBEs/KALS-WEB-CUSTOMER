import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme( {
    palette: {
        primary: {
            main: '#00416c',
        },
        secondary: {
            main: '#e5ebf0',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: 'Kanit, sans-serif',
    }
} );

export default theme;