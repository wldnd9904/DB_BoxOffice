import React, { useState } from 'react'
import styled from 'styled-components'

interface StepContainerProps {
    width:string;
}
const StepContainer = styled.div<StepContainerProps>`
  display: flex;
  justify-content: space-between;
  margin: 70px auto;
  max-width: 600px;
  position: relative;
  :before {
    content: '';
    position: absolute;
    background: #95b5fc;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: '';
    position: absolute;
    background: #135cf8;
    height: 4px;
    width: ${props => props.width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;
const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;
interface StepStyleProps {
    step: string;
}
const StepStyle = styled.div<StepStyleProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid ${props => props.step === 'completed' ? '#135cf8' : '#95b5fc'};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StepCount = styled.span`
  font-size: 19px;
  color: #95b5fc;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
const StepsLabelContainer = styled.div`
  position: absolute;
  white-space:nowrap;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StepLabel = styled.span`
  font-size: 19px;
  color: #135cf8;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #135cf8;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;
export interface Step {
  label:string;
  step:number;
}
interface ProgressStepsProps {
  step:number;
  steps:Step[];
}
function ProgressSteps(params:ProgressStepsProps){
  const totalSteps = params.steps.length
  const width = `${(100 / (totalSteps - 1)) * (params.step - 1)}%`
  return (
      <StepContainer width={width}>
        {params.steps.map(({ step, label }) => (
          <StepWrapper key={step}>
            <StepStyle step={params.step >= step ? 'completed' : 'incomplete'}>
              {params.step > step ? (
                <CheckMark>L</CheckMark>
              ) : (
                <StepCount>{step}</StepCount>
              )}
            </StepStyle>
            <StepsLabelContainer>
              <StepLabel key={step}>{label}</StepLabel>
            </StepsLabelContainer>
          </StepWrapper>
        ))}
      </StepContainer>
  )
}

export default ProgressSteps