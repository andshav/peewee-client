import { alpha, createTheme, getContrastRatio } from '@mui/material';

const baseColor = '#ff6f00';
const mainColor = alpha(baseColor, 0.8);

export const theme = createTheme({
    typography: {
      fontFamily: [
        'AndaleMono',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    palette: {
        primary: {
            main: mainColor,
            light: alpha(baseColor, 0.5),
            dark: alpha(baseColor, 0.9),
            contrastText: getContrastRatio(baseColor, '#fff') > 2 ? '#fff' : '#000',
        },
    },
  });
