import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "react-alice-carousel/lib/alice-carousel.css";

const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path='/' element={<Homepage />}/>
    <Route path='/coins/:id' element={<CoinPage />}/>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
