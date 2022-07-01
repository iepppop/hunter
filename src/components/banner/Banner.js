import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Carousel from './Carousel';

const Banner = () => {
    return (
        <Contain>
            <Container>
                <TagLine>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgray",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding yours favorite Crypto Currency
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
    background:green;
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
`