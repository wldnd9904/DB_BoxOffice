import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Seats from "../../components/Seats";
import Grade from "../../components/atoms/Grade";
import ProgressSteps, { Step } from "../../components/ProgressSteps";
import { useState } from "react";
import Movies from "../../components/Movies";
import Schedules from "../../components/Schedules";
const MainContainer = styled.div`
  padding:0 20px;
  width:100%;
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
                    <title>예매하기</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <ProgressSteps step={currentStep} steps={steps}/>
            { //스텝에 따라 보여줄거
                {
                    1:<Movies onSelect={()=>{setStep(2)}}/>,
                    2:<Schedules onSelect={()=>{setStep(3)}}/>,
                    3:<Seats />,
                    4:<></>,
                }[currentStep]
            }
        </MainContainer>
        </>
    );
}
export default Ticket;