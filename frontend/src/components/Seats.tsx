import { useEffect, useState } from 'react';
import styled from 'styled-components';
const SeatContainer = styled.div`
  display: flex;
  margin-top: 70px;
  position: relative;
  justify-content: center;
`;
const HStack = styled.div`
  >div {
    display: flex;
  }
`;
const VStack = styled.div`
  >div {
    display: flex;
  }
`;

const Seat = styled.div`
  width:20px;
  height:20px;
  margin:1px;
  border:1px solid none;
  justify-content: center;
  align-items: center;
  font-family: Verdana;
  letter-spacing: -0.2em;
  background-color: ${(props)=> props.color || "lightgray"};
  color:white;
`;

const Label = styled(Seat)`
  border:1px solid lightgray;
  font-weight: bold;
  background-color: white;
  color: #333;
`;

const demoV = ["A","B","C","D","E","F","G","H","I","J"];
const demoH = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

function Seats() {
  return (
    <SeatContainer>
      <VStack>
        {demoV.map((label) => 
        <HStack>
          <Label>{label}</Label>
            {demoH.map((num) => 
            <Seat>{num}</Seat>
            )}
        </HStack>)}
      </VStack>
    </SeatContainer>
  )
}
export default Seats;