import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useState } from "react";
import Movies from "../../components/Customer/Movies";
import Pay from "../../components/Customer/Pay";
import ProgressSteps, { Step } from "../../components/Customer/ProgressSteps";
import Schedules from "../../components/Customer/Schedules";
import Seats from "../../components/Customer/Seats";
import { demoSeats } from "../../utils/demos";

const MainContainer = styled.div`
  padding:0 20px;
  width:100%;
  user-select: none;
  cursor:default;
`;
const AnimatedContainer = styled.div<{transitioning:boolean}>`
  transition: all ease 0.2s 0s;
  opacity:${props=>props.transitioning?0:1};
`;
const steps:Step[] = [
    {
      label: '영화 선택',
      step: 1,
    },
    {
      label: '상영일정 선택',
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
    const [transitioning, setTransition] = useState(false);
    const pageTransition = (step:number) => {
      (async () => {
        window.scrollTo(0, 0);
        setTransition(true);
        setTimeout(() => {
          setStep(step);
          setTransition(false);
        }, 200);
      })();
    }
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>예매하기</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <ProgressSteps step={currentStep} steps={steps} onSelect={pageTransition}/>
              <AnimatedContainer transitioning={transitioning}>
                { //스텝에 따라 보여줄거
                    {
                        1:<Movies onSelect={()=>{pageTransition(2)}}/>,
                        2:<Schedules onSelect={()=>{pageTransition(3)}}/>,
                        3:<Seats onSelect={()=>pageTransition(4)}/>,
                        4:<Pay/>,
                    }[currentStep]
                }
              </AnimatedContainer>
        </MainContainer>
        </>
    );
}
export default Ticket;