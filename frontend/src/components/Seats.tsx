import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ISeats, demoSeats } from '../interfaces/Theater';
import Seat from './atoms/Seat';
const SeatContainer = styled.div`
  display: flex;
  margin: 70px auto;
  align-items: center;
  flex-direction: column;
`;
const Screen = styled.div`
  width:100%;
  max-width:600px;
  height:30px;
  line-height:25px;
  text-align: center;
  font-family:'Tahoma','돋움',dotum,Nanum Gothic,sans-serif;
  font-weight: bold;
  color:gray;
  margin: 0 auto 40px auto;
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
const Label = styled.div`
  display:flex;
  width:20px;
  height:20px;
  margin:1px;
  justify-content: center;
  align-items: center;
  text-align:center;
  letter-spacing: -.1em;
  padding-right:.1em;
  background-color: ${(props)=> props.color || "lightgray"};
  border:1px solid lightgray;
  font-weight: bold;
  background-color: none;
  color: #333;
`;

interface SeatsParams {
  seats: ISeats;
  onSelect: () => void;
}

function Seats(params:SeatsParams) {
  return (
    <SeatContainer>
      <Screen>SCREEN</Screen>
      <VStack>
        {Object.keys(params.seats).map((label) => 
          <HStack>
            <Label>{label}</Label>
            {
            params.seats[label].map((seat) => 
              <Seat seat={seat} onSelect={params.onSelect} />
            )}
          </HStack>
        )}
      </VStack>
    </SeatContainer>
  )
}
export default Seats;