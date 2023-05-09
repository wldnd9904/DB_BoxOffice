import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Seats from "../../components/Seats";
import Grade from "../../components/Grade";
import ProgressSteps, { Step } from "../../components/ProgressSteps";
import { useState } from "react";
import CarouselView from "../../components/carouselView";

const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

function Home(){
    const [currentStep, setStep] = useState(1);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>서울씨네마!</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <CarouselView />
        </MainContainer>
        </>
    );
}
export default Home;