import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Seat from './atoms/Seat';
import ISeat, { ISeats } from '../interfaces/Seat';
import NumSelector from './atoms/NumSelector';
import { Button } from 'react-bootstrap';
import IPayment from '../interfaces/Payment';
import Grade from './atoms/Grade';
import { useRecoilValue } from 'recoil';
import { selectedMovieAtom, selectedScheduleAtom } from '../utils/recoilAtoms';
import ISchedule from '../interfaces/Schedule';
import IMovie from '../interfaces/Movie';
import { HHMM } from '../utils/timeFormatter';
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
const BtnContainer = styled.div`
  margin-left:auto;
  margin-right:10px;
  margin-top:10px;`;
const CompleteBtn = styled(Button)`
  margin:2px;
`;
const ResetBtn = styled(Button)`
  margin:2px;
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
const Title = styled.div`
display:flex;
text-align:center;
font-size:1.5em;
font-weight:bold;
margin:5px auto;
padding:0 30px;
div {
    margin-right:5px;
}
`;
const ScheduleTitle = styled.div`
text-align:left;
font-size:1.2em;
font-weight:bold;
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
  onSelect: (receipt:IPayment) => void;
}

function Seats(params:SeatsParams) {
  const selectedMovie = useRecoilValue<IMovie>(selectedMovieAtom);
  const selectedSchedule = useRecoilValue<ISchedule>(selectedScheduleAtom);
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
  // 예약인원 선택
  const select = (current:number, setfunc:React.Dispatch<React.SetStateAction<number>>) => (item:number) => {
    if(adult+teen+senior+disabled-current+item < numSelected){
      alert("선택한 좌석이 인원 수보다 많습니다. 좌석을 취소해 주세요.");
      return;
    }
    setfunc(item);
  };
  // 좌석 선택 초기화
  const reset = () => {
    setLeft(0);setAdult(0);setTeen(0);setSenior(0);setDisabled(0);setNumSelected(0);
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean}[]} = {};
    Object.keys(params.seats).forEach((seats)=>{
      tmpSelection[seats] = params.seats[seats].map((seat)=>({seat:seat,selected:false}));
    });
    setSelection(tmpSelection);
  };
  useEffect(() => {
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean}[]} = {};
    Object.keys(params.seats).forEach((seats)=>{
      tmpSelection[seats] = params.seats[seats].map((seat)=>({seat:seat,selected:false}));
    });
    setSelection(tmpSelection);
  },[]);
  // 좌석선택
  const onSeatSelect = (label:string)=> (seat_no:number) => {
    if(numSelected == adult+teen+senior+disabled) {
      alert("예약 인원을 초과했습니다. 인원을 선택해 주세요.")
      return;
    }
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean}[]} = {};
    Object.assign(tmpSelection,selection);
    if(tmpSelection[label][seat_no-1].selected) setNumSelected(value=>value-1);
    else setNumSelected(value=> value+1);
    tmpSelection[label][seat_no-1].selected = !(tmpSelection[label][seat_no-1].selected);
    setSelection(tmpSelection);
  };
  // 선택완료
  const complete = () => {
    if(numSelected==0){
      alert("인원과 좌석을 선택해주세요.");
      return;
    } else if (numSelected != adult+teen+senior+disabled) {
      alert("선택한 인원과 좌석이 맞지 않습니다.");
      return;
    }
    let receipt:IPayment = {
      pay_no: '',
      cus_no: '',
      pay_met_no: '',
      pay_state: false,
      pay_amount: adult*15000+teen*10000+senior*10000+disabled*10000,
      pay_date: new Date(),
      pay_point: 0,
      pay_detail: Object.keys(params.seats).map(label=>selection[label].filter(seat=>seat.selected).map(seat=>label+seat.seat.seat_no)).flat().toString()
    }
    params.onSelect(receipt);
  }
  return (
    <SeatContainer>
      <Title>
        <Grade grade={selectedMovie.mov_grade_no} />
        {selectedMovie.mov_nm} - {selectedSchedule.run_type}
      </Title>
      <ScheduleTitle>{`${HHMM(selectedSchedule.run_date)}~${HHMM(selectedSchedule.run_end_date)}`}</ScheduleTitle>
      <SelectorsContainer>
        <NumSelector label="일반" current={adult} limit={8} left={left} onSelect={select(adult,setAdult)}/>
        <NumSelector label="청소년" current={teen} limit={8} left={left} onSelect={select(teen,setTeen)}/>
        <NumSelector label="경로" current={senior} limit={8} left={left} onSelect={select(senior,setSenior)}/>
        <NumSelector label="우대" current={disabled} limit={8} left={left} onSelect={select(disabled,setDisabled)}/>
      </SelectorsContainer>
      <Screen>SCREEN</Screen>
      <VStack>
        {Object.keys(selection).map((label) => 
          <HStack key={label}>
            <Label>{label}</Label>
            {
            selection[label].map((seatselected,idx) => 
              <Seat key={label+idx} seat={seatselected.seat} selected={seatselected.selected} onSelect={onSeatSelect(label)} />
            )}
          </HStack>
        )}
      </VStack>
      <BtnContainer>
        <ResetBtn variant="danger" onClick={reset}>초기화</ResetBtn>  
        <CompleteBtn onClick={complete}>선택 완료</CompleteBtn>  
      </BtnContainer>
    </SeatContainer>
  )
}
export default Seats;