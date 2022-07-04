import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../components/config/api";
import { CryptoState } from "../CryptoContext";
import styled from 'styled-components';
import CoinInfo from "./CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from 'react-html-parser';

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  });

  if (!coin) return <LinearProgress style={{ background: "gold" }} />

  return (
    <Contain>
      <SideBar>
        <img src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3">
          <span>
            {coin?.name}
          </span>
        </Typography>
        <Typography
          variant="subtitle1">
          <Dep>
            {coin?.description.ko.split(". ")[0]}
          </Dep>
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Rank>
              Rank:
            </Rank>
            <h5>
              {coin?.market_cap_rank}
            </h5>
          </span>
          <span style={{ display: "flex" }}>
            <Rank>
              Current Price:
            </Rank>
            <h5>
              {symbol}{""}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </h5>
          </span>
          <span style={{ display: "flex" }}>
            <Rank>
              Market Cap: {" "}
            </Rank>
            <h5>
              {symbol}{""}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, 6)
              )}
              M
            </h5>
          </span>
        </MarketData>
      </SideBar>
      <CoinInfo coin={coin} />
    </Contain>
  )
}
export default CoinPage;

const Contain = styled.div`
  display:flex;
  color:#fff;

  @media (max-width: 768px){
    flex-direction: column;
    align-items: center;
  }
`

const SideBar = styled.div`
  width:30%;
  display:flex;
  flex-direction: column;
  align-items: center;
  margin-top:25,
  border-right: 2px solid grey;

  span{
    font-family:"Montserrat";
    font-weight:900;
    margin-bottom:20px;
  }

  @media (max-width: 1268px){
    width:100%;
   }

  @media (max-width: 768px){
    width:100%;
  }
`

const Dep = styled.div`
  width:100%;
  font-family: "Montserrat";
  padding: 25px;
  padding-bottom:15px;
  padding-top:0;
  text-align: justify;
`

const MarketData = styled.div`

h5{
  font-size:25px;

  @media (max-width: 1268px){
    margin:0 20px 0 0;
   }
}

@media (max-width: 1268px){
 display:flex;
 justify-content: space-around;
}

@media (max-width: 768px){
  display:flex;
  flex-direction: column;
  justify-content:first;
 }

`

const Rank = styled.h5`
  font-size:25px;
  margin:0 10px 0 0;
`