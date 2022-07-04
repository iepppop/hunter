import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const handleDragStart = (e) => e.preventDefault();

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coins/${coin.id}`}>
        <CarouselItem>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            stlye={{ marginBotton: 10 }} />
          <span>
            {coin?.symbol} &nbsp;
            <span style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}>
              {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {numberWithCommas(coin?.current_price)}
          </span>
        </CarouselItem>
      </Link>
    )
  })

  return (
    <Contain>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Contain>
  )
}
export default Carousel;

const Contain = styled.div`
  height:50%;
  display:flex;
  align-items:center;
`

const CarouselItem = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  color: white;
`

