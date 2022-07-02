import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CryptoState } from '../../CryptoContext';
import { TrendingCoins } from '../config/api';
import AliceCarousel from 'react-alice-carousel';

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState();

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

const images = [
  "https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/DX3279-010/a9c9f944-3e7e-4834-98ff-9fba531bc76f_primary.jpg?gallery",
  "https://deltasport.ua/upload/iblock/879/BV0050_400_a.jpg",
  "https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/DM0028-400/19a2547a-01dc-440b-a26f-0bd471f754e6_primary.jpg?zoom",
  "https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/555088-706/437f6a05-743a-433f-b54b-bdf842cc5117_primary.jpg?zoom",
  "https://static-breeze.nike.co.kr/kr/ko_kr/cmsstatic/product/CZ9889-808/4f82e8f3-f2fb-4f4a-af16-dc44f277b282_primary.jpg?zoom",
  "https://i.pinimg.com/564x/53/35/b1/5335b1cc67a24fb3fef83b81bdb890e9.jpg"
];

const items = images.map((image) => {
  return (
    <ItemsContain>
    <ItemsWrap>
      <img src={image} alt="" />
    </ItemsWrap>
    </ItemsContain>
  )
})

return (
  <Contain>
    <AliceCarousel
      mouseTracking
      infinite={1000}
      animationDuration={1000}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      paddingRight={40}
    />
  </Contain>
)
}
export default Carousel;

const Contain = styled.div`
  width:100%;
  height:50%;
  display:flex;
  align-items:center;
  margin:0 auto;
  overflow:hidden;
`

const ItemsContain = styled.div`
  width:100%;
  height:100%;
  padding: 0 10px;
`

const ItemsWrap = styled.div`
  width:100%;
  height:180px;
  border-radius:20px;
  overflow:hidden;
  margin:0 20px;

  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
`
