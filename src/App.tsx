import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
      </Routes>
     </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
