import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Carousel from './Carousel';

const Banner = () => {
    return (
        <Contain>
            <LColor />
            <Container>
                <TagLine>
                    <NikeLogo>
                        CrytoHunter
                        <h2>bitcoin website</h2>
                    </NikeLogo>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 5,
                            fontFamily: "Montserrat",
                            background: "dcc9a3",
                            width:250,
                            color:"white",
                        }}
                    >
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgray",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                            fontSize:'10px'
                        }}
                    >
                    </Typography>
                </TagLine>
                <Carousel />
            </Container>
        </Contain>
    )
}
export default Banner;

const Contain = styled.div`
    width:100%;
    height:100%;
    position:relative;
`

const Container = styled.div`
     height:400px;
     display:flex;
     flex-direction:column;
     padding:25px 0 0 0;
     justify-content: space-around;
`

const TagLine = styled.div`
    display: flex;
    height: 40%;
    flex-direction: column;
    justify-content:center;
    text-align: center;
    align-items: center;
`

const LColor = styled.div`
    background:url('https://blog.kakaocdn.net/dn/cmwsZ3/btrGiQplZC7/yhV3kFqZslhz29VKWlVNi0/img.jpg') 90% 90%;
    position:absolute;
    top:0;
    left:0;
    z-index:-2;
    width:100%;
    height:100%;
`

const NikeLogo = styled.div`
    width:100px;
    color:#fff;
    font-weight:bold;
    font-size:50px;
    display:flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;
    
    h2{
        font-size:12px;
        opacity:0.8;
    }
`