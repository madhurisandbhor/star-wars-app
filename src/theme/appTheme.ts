import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#f50057',
    }
  },
  typography: {
    fontFamily: '"Crimson Pro", serif',
    htmlFontSize: 10,
  },
});

export default Theme;