import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
    <Homepage />
    <Routes>
    <Route path='/' component={Homepage}/>
    <Route path='/coins/:id' component={CoinPage}/>
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
