import styled from "styled-components";
import { colors } from "../../utils/Colors";
import ISeat from "../../interfaces/Seat";

const SeatBox = styled.div<{selected:boolean, grade:number|string}>`
  cursor: ${props=>props.grade=="CD00500"?"default":"pointer"};
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
  background-color: ${(props)=> props.selected?"red":"lightgray"};
  opacity:${props=>props.grade=="CD00500"?0:1};
  color:white;
  :hover {
    background-color: red;
  }
  border:2px solid ${props=>colors[props.grade as string]};
`;

const SoldSeatBox = styled.div<{grade:number|string}>`
  cursor: default;
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
  background-color: lightgray;
  opacity:${props=>props.grade=="CD00500"?0:1};
  color:white;
  border:2px solid ${props=>colors[props.grade as string]};
`;

interface SeatParams {
    seat:ISeat;
    selected:boolean;
    issue?:boolean;
    maker?:boolean;
    onSelect:(seat_no:number)=>void;
}

function Seat(params:SeatParams) {
    const seatID=params.seat.seat_no;
    return (params.issue?
      <SoldSeatBox grade={params.seat.seat_grade_no}>
          X
      </SoldSeatBox>
    :
    <SeatBox onClick={()=>{if(params.maker||params.seat.seat_grade_no!="CD00500")params.onSelect(params.seat.seat_no as number)}} selected={params.selected} grade={params.seat.seat_grade_no}>
        {seatID}
    </SeatBox>
    );
}

export default Seat;