import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, Col, Form } from 'react-bootstrap';
import IMovie from '../../interfaces/Movie';
import ISchedule from '../../interfaces/Schedule';
import { IPeopleSelected } from '../../interfaces/Ticket';
import { selectedMovieAtom, selectedScheduleAtom, selectedPeopleAtom, seatGradeNameAtom } from '../../utils/recoilAtoms';
import { YYYYMMDD, HHMM } from '../../utils/timeFormatter';
import Grade from '../atoms/Grade';
import NumSelector from '../atoms/NumSelector';
import Seat from '../atoms/Seat';
import CodeManager from '../../utils/CodeManager';
import { ISeatGrade } from '../../interfaces/Codes';
import { colors } from '../../utils/Colors';
import SeatManager from '../../utils/SeatManager';
import ISeat, { ISeats } from '../../interfaces/Seat';
const SeatContainer = styled.div`
  display: flex;
  max-width: 600px;
  align-items: center;
  flex-direction: column;
`;
const BtnContainer = styled.div`
  margin-left:auto;
  margin-right:10px;
  margin-top:50px;
`;
const CompleteBtn = styled(Button)`
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
const SizeForm = styled(Form.Group)`
  display:flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin:0 10px;
  input {
    width:100px;
    margin:10px;
  }
`;
interface SeatsMakerParams {
  thea_no:number|string;
  seats?:boolean;
  onSelect: (seat:ISeats) => void;
}
function SeatsMaker(params:SeatsMakerParams) {
  const limit:number=20;
  const [seatGrades,setSeatGrades] = useRecoilState<ISeatGrade>(seatGradeNameAtom);
  const [rows,setRows] = useState<number>(10);
  const [cols,setCols] = useState<number>(10);
  const [seats,setSeats] = useState<ISeats>({});
  const [done, setDone] = useState<boolean>(false);
  useEffect(()=>{
    if(!params.seats){
      let tmpSeats:ISeats = {};
      for(let i=0;i<rows;i++){
        let tmpRow:ISeat[] = [];
        for(let j=1;j<=cols;j++){
          let tmpSeat:ISeat = {
            seat_no: j,
            thea_no: params.thea_no,
            seat_grade_no: "CD00501"
          }
          tmpRow.push(tmpSeat);
        }
        tmpSeats[String.fromCharCode(65+i)] = tmpRow;
      }
      setSeats(tmpSeats);
    }
  },[rows,cols]);
  useEffect(() => {
    (async ()=>{
      if(!seatGrades){
        await setSeatGrades(await CodeManager.getSeatGradeData());
      }
      if(params.seats){
        let seats = await SeatManager.getSeats(params.thea_no);
        let keys = Object.keys(seats);
        setRows(seats[keys[0]].length)
        setCols(keys.length)
        setSeats(seats);
      }
    })();
    if((!params.seats)){
      let tmpSeats:ISeats = {};
      for(let i=0;i<rows;i++){
        let tmpRow:ISeat[] = [];
        for(let j=1;j<=cols;j++){
          let tmpSeat:ISeat = {
            seat_no: j,
            thea_no: params.thea_no,
            seat_grade_no: "CD00501"
          }
          tmpRow.push(tmpSeat);
        }
        tmpSeats[String.fromCharCode(65+i)] = tmpRow;
      }
      setSeats(tmpSeats);
    }
  },[]);

  const changeGrade = (label:string, seat_no:number) => {
    let tmpSeats:ISeats = {};
    Object.assign(tmpSeats,seats);
    const currentGrade = Object.keys(seatGrades).findIndex((value)=>value==tmpSeats[label][seat_no-1].seat_grade_no);
    let nextGrade:number = currentGrade+1;
    console.log(currentGrade, nextGrade);
    if(nextGrade==Object.keys(seatGrades).length)nextGrade=0;
    tmpSeats[label][seat_no-1].seat_grade_no = Object.keys(seatGrades)[nextGrade];
    setSeats(tmpSeats);
  }
  
  const onSelect = () => {
    setDone(true);
    alert("좌석이 생성되었습니다.");
    params.onSelect(seats);
  }

  return (
    <SeatContainer>
      <SizeForm>
        <Form.Label>행</Form.Label>
        <Form.Control disabled={params.seats} type="number" value={rows} onChange={(e)=>setRows(parseInt(e.currentTarget.value))}></Form.Control>
        <Form.Label>열</Form.Label>
        <Form.Control disabled={params.seats} type="number" value={cols} onChange={(e=>setCols(parseInt(e.currentTarget.value)))}></Form.Control>
      </SizeForm>
      <Screen>SCREEN</Screen>
      <SeatsContainer>
        <SeatIndicatorContainer>
            {seatGrades?Object.keys(seatGrades).map((seat_grade_no, idx)=>
              (seat_grade_no!="CD00500"?<SeatIndicator key={idx}>
                <MiniBox color={colors[seat_grade_no]}/>: {seatGrades[seat_grade_no].seat_grade_nm}
              </SeatIndicator>:null)
            ):null}
        </SeatIndicatorContainer>
        <VStack>
          {Object.keys(seats).map((label) => 
            <HStack key={label}>
              <Label>{label}</Label>
              {
              seats[label].map((seat,idx) => 
                <Seat maker={true} key={label+idx} seat={seat} selected={false} onSelect={()=>changeGrade(label,parseInt(seat.seat_no as string))} />
              )}
            </HStack>
          )}
        </VStack>
      </SeatsContainer>
      {!done?<BtnContainer>
        <CompleteBtn onClick={onSelect}>선택 완료</CompleteBtn>  
      </BtnContainer>:null
      }
    </SeatContainer>
  )
}
export default SeatsMaker;