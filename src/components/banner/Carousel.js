import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../config/api';

const Carousel = () => {
    const [ trending, setTrending ] = useState([]);
    const { currency } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

  return (
    <Contain>Carousel</Contain>
  )
}
export default Carousel;

const Contain = styled.div`
    height:50%;
    display:flex;
    align-items:center;
`