import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "./config/api";
import { CryptoState } from '../CryptoContext';
import styled from 'styled-components';
import { TextField, Typography, LinearProgress, Pagination } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ClassNames } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency, symbol } = CryptoState();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    // const darkTheme = createTheme({
    //     palette: {
    //       mode: 'dark',
    //     },
    //   });

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    };


    return (
        <Container>
            <Typography
                variant="h4"
                style={{ margin: 18, fontFamily: "Montserrat", color: "#FFF" }}>
                Cryptocyrrency Prices by Market Cap
            </Typography>
            <TextField
                label="Search For a Crypto Currency"
                variant="outlined"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
            >
            </TextField>
            <TableContainer component={Paper}>
                {
                    loading ? (
                        <LinearProgress style={{
                            background: "gold",
                        }}></LinearProgress>
                    )
                        :
                        (
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead style={{ background: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.id}`)}
                                                    key={row.name}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}>
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }} />
                                                        <WrapList>
                                                            <span>
                                                                {row.symbol}
                                                            </span>
                                                            <h1>
                                                                {row.name}
                                                            </h1>
                                                        </WrapList>
                                                    </TableCell>
                                                    <TableCell
                                                        align="right">
                                                        {symbol}{""}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{""}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        )
                }
            </TableContainer>
            <Pagination
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            >

            </Pagination>
        </Container>
    )
}
export default CoinsTable;

const Container = styled.div`
    text-align: center;
    background: #14161a;
    padding:18px;

    .MuiTableBody-root .MuiTableRow-root{
        cursor:pointer;
    }
    .MuiTableBody-root .MuiTableRow-root:hover{
        background: #131111;
    }
`

const WrapList = styled.div`
    display:flex;
    flex-direction: column;

    span{
        text-transform:uppercase;
        font-size:22px;
    }

    h1{
        font-size:12px;
        font-weight:500;
        color:darkgray;
    }
`