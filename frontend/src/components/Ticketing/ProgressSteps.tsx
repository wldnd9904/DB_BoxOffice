import React, { useState } from 'react'
import styled from 'styled-components'

const MainContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
`
interface StepContainerProps {
    width:string;
}
const StepContainer = styled.div<StepContainerProps>`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
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
`

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`
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
`

const StepCount = styled.span`
  font-size: 19px;
  color: #95b5fc;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const StepsLabelContainer = styled.div`
  position: absolute;
  white-space:nowrap;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StepLabel = styled.span`
  font-size: 19px;
  color: #135cf8;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 100px;
`

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #135cf8;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #95b5fc;
    color: #000000;
    cursor: not-allowed;
  }
`

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #135cf8;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`

const steps = [
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
]

const ProgressSteps = () => {
  const [activeStep, setActiveStep] = useState(1)

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  const totalSteps = steps.length

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`

  return (
    <MainContainer>
      <StepContainer width={width}>
        {steps.map(({ step, label }) => (
          <StepWrapper key={step}>
            <StepStyle step={activeStep >= step ? 'completed' : 'incomplete'}>
              {activeStep > step ? (
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
      <ButtonsContainer>
        <ButtonStyle onClick={prevStep} disabled={activeStep === 1}>
          Previous
        </ButtonStyle>
        <ButtonStyle onClick={nextStep} disabled={activeStep === totalSteps}>
          Next
        </ButtonStyle>
      </ButtonsContainer>
    </MainContainer>
  )
}

export default ProgressSteps