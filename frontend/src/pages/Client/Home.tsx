import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Seats from "../../components/Ticketing/Seats";
import ProgressSteps from "../../components/Ticketing/ProgressSteps";
import Grade from "../../components/Ticketing/Grade";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function Home(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>서울씨네마!</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <ProgressSteps/>
            <Grade grade="all"/>
            <Grade grade="12" />
            <Grade grade="15" />
            <Grade grade="18" />
            <Seats/>
        </Container>
        </>
    );
}
export default Home;