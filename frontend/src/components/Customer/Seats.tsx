import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from 'react-bootstrap';
import IMovie from '../../interfaces/Movie';
import ISchedule from '../../interfaces/Schedule';
import { IPeopleSelected } from '../../interfaces/Ticket';
import { selectedMovieAtom, selectedScheduleAtom, selectedPeopleAtom, seatGradeNameAtom, customerAtom, reservationsAtom, selectedTheaterAtom, currentPayNoAtom } from '../../utils/recoilAtoms';
import { YYYYMMDD, HHMM } from '../../utils/timeFormatter';
import Grade from '../atoms/Grade';
import NumSelector from '../atoms/NumSelector';
import Seat from '../atoms/Seat';
import { ISeatGrade } from '../../interfaces/Codes';
import CodeManager from '../../utils/CodeManager';
import { colors } from '../../utils/Colors';
import ISeat, { ISeatIssueList, ISeats } from '../../interfaces/Seat';
import ICustomer from '../../interfaces/Customer';
import TheaterManager from '../../utils/TheaterManager';
import SeatManager from '../../utils/SeatManager';
import PaymentManager from '../../utils/PaymentManager';
import { IReceipt } from '../../interfaces/Payment';
import ITheater from '../../interfaces/Theater';
const SeatContainer = styled.div`
  display: flex;
  margin: 70px auto;
  max-width: 600px;
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
  margin-top:50px;`;
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
margin:5px;
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
const SeatsContainer = styled.div`
  display:flex;
  flex-direction: row;
`;
const SeatIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const MiniBox = styled.div<{color:string}>`
  width:1em;
  height:1em;
  background-color:${props=>props.color};
`;
const SeatIndicator = styled.div`
  display:flex;
  flex-direction:row;
  margin-right:10px;
  margin-bottom:2px;
  font-size:70%;
  font-weight:bold;
`;
interface SeatsParams {
  onSelect: () => void;
}

function Seats(params:SeatsParams) {
  const userData = useRecoilValue<ICustomer>(customerAtom);
  const selectedMovie = useRecoilValue<IMovie>(selectedMovieAtom);
  const selectedTheater = useRecoilValue<ITheater>(selectedTheaterAtom);
  const [reservations, setReservations] = useRecoilState<IReceipt[]>(reservationsAtom);
  const [theaterSeats,setTheaterSeats] = useState<ISeats>({});
  const [seatIssueList,setSeatIssueList] = useState<ISeatIssueList>({});
  const [seatGrades,setSeatGrades] = useRecoilState<ISeatGrade>(seatGradeNameAtom);
  const [currentPayNo, setCurrentPayNo] = useRecoilState<string>(currentPayNoAtom);
  const selectedSchedule = useRecoilValue<ISchedule>(selectedScheduleAtom);
  const [selectedPeople, setSelectedPeople] = useRecoilState<IPeopleSelected>(selectedPeopleAtom);
  const [selection, setSelection] = useState<{[index:string]:{seat:ISeat,selected:boolean,tic_no:number}[]}>({});
  const [numSelected, setNumSelected] = useState<number>(0);
  const limit:number=10;
  const [left, setLeft] = useState<number>(limit);
  const [adult, setAdult] = useState<number>(0);
  const [teen, setTeen] = useState<number>(0);
  const [senior, setSenior] = useState<number>(0);
  const [disabled, setDisabled] = useState<number>(0);
  //등급,좌석,발권여부 불러오기
  useEffect(() => {
    (async ()=>{
      if(!seatGrades){
        setSeatGrades(await CodeManager.getSeatGradeData());
      }
      setSeatIssueList(await SeatManager.getIssueList(selectedSchedule.sched_no));
      setTheaterSeats(await SeatManager.getSeats(selectedSchedule.thea_no));
    })()},[seatGrades]);
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
    setLeft(limit);
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean, tic_no:number}[]} = {};
    let tmpIssueList:ISeatIssueList = {};
    Object.assign(tmpIssueList,seatIssueList);
    console.log(tmpIssueList)
    Object.keys(theaterSeats).forEach((seats)=>{
      tmpSelection[seats] = theaterSeats[seats].map((seat)=>({seat:seat,selected:false, tic_no:tmpIssueList[seats+(seat.seat_no.toString().padStart(2,'0'))]?tmpIssueList[seats+(seat.seat_no.toString().padStart(2,'0'))].tic_no:0}));
    });
    console.log(tmpSelection)
    setSelection(tmpSelection);
  };
  useEffect(() => {
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean, tic_no:number}[]} = {};
    let tmpIssueList:ISeatIssueList = {};
    Object.assign(tmpIssueList,seatIssueList);
    Object.keys(theaterSeats).forEach((seats)=>{
      tmpSelection[seats] = theaterSeats[seats].map((seat)=>({seat:seat,selected:false, tic_no:tmpIssueList[seats+(seat.seat_no.toString().padStart(2,'0'))]?tmpIssueList[seats+(seat.seat_no.toString().padStart(2,'0'))].tic_no:0}));
    });
    setSelection(tmpSelection);
  },[theaterSeats,seatIssueList]);
  // 좌석선택
  const onSeatSelect = (label:string)=> (seat_no:number) => {
    let tmpSelection: {[index:string]:{seat:ISeat,selected:boolean, tic_no:number}[]} = {};
    Object.assign(tmpSelection,selection);
    if(numSelected == adult+teen+senior+disabled && !tmpSelection[label][seat_no-1].selected) {
      alert("예약 인원을 초과했습니다. 인원을 선택해 주세요.")
      return;
    }
    if(tmpSelection[label][seat_no-1].selected) setNumSelected(value=>value-1);
    else setNumSelected(value=> value+1);
    tmpSelection[label][seat_no-1].selected = !(tmpSelection[label][seat_no-1].selected);
    setSelection(tmpSelection);
  };
  // 선택완료
  const complete = async () => {
    if(userData==undefined){
      alert("로그인해야 합니다.");
      return;
    }
    if(numSelected==0){
      alert("인원과 좌석을 선택해주세요.");
      return;
    } else if (numSelected != adult+teen+senior+disabled) {
      alert("선택한 인원과 좌석이 맞지 않습니다.");
      return;
    }
    let detail = "";
    let detail2 = "";
    const selected = Object.keys(theaterSeats).map(label=>selection[label].filter(seat=>seat.selected).map(seat=>label+seat.seat.seat_no)).flat();
    const selectedTickets = Object.keys(theaterSeats).map(label=>selection[label].filter(seat=>seat.selected).map(seat=>seat.tic_no)).flat();
    let currentSeat:string = "";
    for(const seat in selected){
      console.log(selected[seat])
      if(currentSeat!=selected[seat][0]){
        currentSeat = selected[seat][0];
        detail += (selected[seat][0]+"열 ");
        detail += selected[seat].slice(1)+", ";
      }else{
        detail += selected[seat].slice(1)+", ";
      }
    }
    for(const seat in selected){
        detail2 += selected[seat]+" ";
    }
    detail = detail.slice(0,-2);
    const receipt:IPeopleSelected = {
      adult:adult,
      teen:teen,
      senior:senior,
      disabled:disabled,
      detail:detail,
      detail2:detail2,
      ticketNumbers:selectedTickets,
    };
    console.log(receipt);
    setSelectedPeople(receipt)
    let tmpPayNo:string=await PaymentManager.bookTickets(receipt);
    setCurrentPayNo(tmpPayNo);
    setReservations(await PaymentManager.getPaymentListData());
    params.onSelect();
  }
  return (
    <SeatContainer>
      <Title>
        <Grade grade={selectedMovie.mov_grade_no} />
        {selectedMovie.mov_nm} - {selectedSchedule.run_type}
      </Title>
      <ScheduleTitle>{`${YYYYMMDD(new Date(selectedSchedule.run_date))} ${HHMM(new Date(selectedSchedule.run_date))}~${HHMM(new Date(selectedSchedule.run_end_date))}`}</ScheduleTitle>
      <ScheduleTitle>{`${selectedTheater.thea_loc} ${selectedTheater.thea_nm}`}</ScheduleTitle>
      <SelectorsContainer>
        <NumSelector label="일반" current={adult} limit={8} left={left} onSelect={select(adult,setAdult)}/>
        <NumSelector label="청소년" current={teen} limit={8} left={left} onSelect={select(teen,setTeen)}/>
        <NumSelector label="경로" current={senior} limit={8} left={left} onSelect={select(senior,setSenior)}/>
        <NumSelector label="우대" current={disabled} limit={8} left={left} onSelect={select(disabled,setDisabled)}/>
      </SelectorsContainer>
      <Screen>SCREEN</Screen>
      <SeatsContainer>
        <SeatIndicatorContainer>
          {seatGrades?Object.keys(seatGrades).map((seat_grade_no, idx)=>
              (seat_grade_no!="CD00500"?<SeatIndicator key={idx}>
                <MiniBox color={colors[seat_grade_no]}/>: {seatGrades[seat_grade_no].seat_grade_nm}
              </SeatIndicator>:null)
            ):null}
        </SeatIndicatorContainer>
        <VStack style={adult+teen+senior+disabled==0?{opacity:"0.5",pointerEvents: "none"}:{}}>
          {Object.keys(selection).map((label) => 
            <HStack key={label}>
              <Label>{label}</Label>
              {
              selection[label].map((seatselected,idx) => 
                <Seat key={label+idx} issue={(seatIssueList[label+(idx+1).toString().padStart(2,'0')]?.issue)??false} seat={seatselected.seat} selected={seatselected.selected} onSelect={onSeatSelect(label)} />
              )}
            </HStack>
          )}
        </VStack>
      </SeatsContainer>
      <BtnContainer>
        <ResetBtn variant="danger" onClick={reset}>초기화</ResetBtn>  
        <CompleteBtn onClick={complete}>선택 완료</CompleteBtn>  
      </BtnContainer>
    </SeatContainer>
  )
}
export default Seats;