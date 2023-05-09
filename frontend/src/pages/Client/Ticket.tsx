import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Seats from "../../components/Seats";
import Grade from "../../components/Grade";
import ProgressSteps, { Step } from "../../components/ProgressSteps";
import { useState } from "react";
import Movies from "../../components/Movies";
const MainContainer = styled.div`
  width: 100%;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
`;
const steps:Step[] = [
    {
      label: '영화 선택',
      step: 1,
    },
    {
      label: '상영관/날짜/시간 선택',
      step: 2,
    },
    {
      label: '좌석 선택',
      step: 3,
    },
    {
      label: '결제',
      step: 4,
    },
  ];
function Ticket(){
    const [currentStep, setStep] = useState(1);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>서울씨네마!</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <ProgressSteps step={currentStep} steps={steps}/>
            {
                {
                    1:<Movies onSelect={()=>{setStep(2)}}/>,
                    2:<></>,
                    3:<Seats />,
                    4:<></>,
                }[currentStep]
            }
        </MainContainer>
        </>
    );
}
export default Ticket;