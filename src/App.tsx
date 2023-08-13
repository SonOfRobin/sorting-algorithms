import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './App.css';
import BarContainer from './components/BarContainer';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box component={Paper} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <header>
            <Typography variant='h2' px={4} py={2}>
              Sorting Visualizer
            </Typography>
          </header>
          <BarContainer />
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;
