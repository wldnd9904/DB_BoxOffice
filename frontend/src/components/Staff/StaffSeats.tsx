import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ISeat, { ISeats } from '../../interfaces/Seat';
import NumSelector from '../atoms/NumSelector';
import Seat from '../atoms/Seat';
const SeatContainer = styled.div`
  display: flex;
  margin: 70px auto;
  align-items: center;
  flex-direction: column;
`;
const SelectorsContainer = styled.div`
  display: flex;
  margin: 10px auto;
  align-items: end;
  flex-direction: column;
`;

const Screen = styled.div`
  width:100%;
  max-width:600px;
  height:30px;
  line-height:30px;
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
  border:1px solid lightgray;
  font-weight: bold;
  background-color: none;
  color: #333;
`;

interface SeatsParams {
  seats: ISeats;
  onSelect: () => void;
}

function StaffSeats(params:SeatsParams) {
  const [selection, setSelection] = useState<{[index:string]:{seat:ISeat,selected:boolean}[]}>({});
  const [numSelected, setNumSelected] = useState<number>(0);
  const limit:number=10;
  const [left, setLeft] = useState<number>(limit);
  const [adult, setAdult] = useState<number>(0);
  const [teen, setTeen] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  const [disabled, setDisabled] = useState<number>(0);
  // 남은 예약인원 수 업데이트
  useEffect(()=> {
    setLeft(limit-adult-teen-senior-disabled);
  },[adult,teen,senior,disabled]);
  const select = (setfunc:React.Dispatch<React.SetStateAction<number>>) => (item:number) => {
    setfunc(item);
  };
  // 좌석 선택 초기화
  useEffect(() => {
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean}[]} = {};
    Object.keys(params.seats).forEach((seats)=>{
      tmpSelection[seats] = params.seats[seats].map((seat)=>({seat:seat,selected:false}));
    });
    setSelection(tmpSelection);
  },[]);
  const onSeatSelect = (label:string)=> (seat_no:number) => {
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean}[]} = {};
    Object.assign(tmpSelection,selection);
    console.log(tmpSelection);
    tmpSelection[label][seat_no-1].selected = !(tmpSelection[label][seat_no-1].selected);
    console.log(tmpSelection);
    setSelection(tmpSelection);
  };
  return (
    <SeatContainer>
      <SelectorsContainer>
        <NumSelector label="일반" current={adult} limit={8} left={left} onSelect={select(setAdult)}/>
        <NumSelector label="청소년" current={teen} limit={8} left={left} onSelect={select(setTeen)}/>
        <NumSelector label="경로" current={senior} limit={8} left={left} onSelect={select(setSenior)}/>
        <NumSelector label="우대" current={disabled} limit={8} left={left} onSelect={select(setDisabled)}/>
      </SelectorsContainer>
      <Screen>SCREEN</Screen>
      <VStack>
        {Object.keys(selection).map((label) => 
          <HStack>
            <Label>{label}</Label>
            {
            selection[label].map((seatselected,idx) => 
              <Seat key={label+idx} seat={seatselected.seat} selected={seatselected.selected} onSelect={onSeatSelect(label)} />
            )}
          </HStack>
        )}
      </VStack>
    </SeatContainer>
  )
}
export default StaffSeats;