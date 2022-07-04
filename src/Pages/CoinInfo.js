import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../components/config/api";
import { CryptoState } from "../CryptoContext";
import styled from 'styled-components';
import { CircularProgress } from "@mui/material";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { chartDays } from "../components/config/data";
import SelectButton from "../components/SelectButton";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

        setHistoricData(data.prices);
    }

    useEffect(() => {
        fetchHistoricData();
    }, [days]);
    

    return (
        <Container>
            {!historicData ? (
                <CircularProgress
                    style={{ color: "gold" }}
                    size={250}
                    thickness={1} />
            )
                : (
                    <>
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [
                                    {
                                        data: historicData.map((coin) => coin[1]),
                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                        borderColor: "#EEBC1D",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }}
                        />
                        <Chartday>
                            {chartDays.map(day=>(
                                <SelectButton
                                key={day.value}
                                onClick={()=> setDays(day.value)}
                                selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </Chartday>
                    </>
                )}
        </Container>
    )
}
export default CoinInfo;

const Container = styled.div`
    width:75%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:centerl
    margin-top:25px;
    padding:40px;

    @media (max-width: 768px){
        width:100%;
        margin-top:0;
        padding:20px;
        padding-top:0;
      }
`

const Chartday = styled.div`
    display: flex;
    margin:20px 0 0 0;
    justify-content: space-around;
    width: 100%;
`