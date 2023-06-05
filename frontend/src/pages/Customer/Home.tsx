import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import CarouselView from "../../components/Customer/CarouselView";
import Movies from "../../components/Customer/Movies";

const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

function Home(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>서울씨네마!</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <CarouselView />
            <Movies home onSelect={()=>{}} />
        </MainContainer>
        </>
    );
}
export default Home;