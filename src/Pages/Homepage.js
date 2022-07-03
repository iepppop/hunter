import Banner from "../components/banner/Banner";
import styled from 'styled-components';
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
    return (
        <Contain>
            <Banner />
            <CoinsTable />
        </Contain>
    )
}
export default Homepage;

const Contain = styled.div`
    
`
