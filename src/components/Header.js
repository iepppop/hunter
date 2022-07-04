import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext'

const Header = () => {
    const navigate = useNavigate();
    const { currency, setCurrency } = CryptoState();



    return (

        <Contain>
            <AppBar color="transparent" position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        onClick={() => navigate('/')}
                        variant="h6"
                        style={{
                            color: "gold",
                            fontFamily: "Montserrat",
                            fontWeight: "bold",
                            cursor: "pointer",
                            flex: 1,
                        }}>
                        Crypto Hunter
                    </Typography>
                    <Select variatnt="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                            border: "1px solid #fff"
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'KRW'}>KRW</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </Contain>

    )
}
export default Header;

const Contain = styled.div`
    background: #14161a;
    color:white;
    max-height: 100vh;
`