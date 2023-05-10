import { useEffect, useState } from 'react';
import styled from 'styled-components';
const SeatContainer = styled.div`
  display: flex;
  margin: 70px auto;
  align-items: center;
  flex-direction: column;
`;
const Screen = styled.div`
  width:100%;
  height:30px;
  line-height:25px;
  text-align: center;
  font-family:'Tahoma','돋움',dotum,Nanum Gothic,sans-serif;
  font-weight: bold;
  margin: 0 auto;
  background:url('https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/screen_bg.png?raw=true') repeat-x left;
`;
const HStack = styled.div`
  display:flex;
  flex-direction: row;
`;
const VStack = styled.div`
  display:flex;
  flex-direction: column;
`;

const Seat = styled.div`
  display:flex;
  width:20px;
  height:20px;
  margin:1px;
  border:1px solid none;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align:center;
  letter-spacing: -.1em;
  padding-right:.1em;
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
      <Screen>SCREEN</Screen>
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