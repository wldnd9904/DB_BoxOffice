import styled from "styled-components";
import ISeat from "../../interfaces/Seat";

const gradeColor = (seat_grade_no:number|string) => {
  switch(parseInt(`${seat_grade_no}`)){
    case 1: return "none";
    case 2: return "pink";
    case 3: return "lightblue";
  }
  return "none";
};

const SeatBox = styled.div<{selected:boolean, grade:number|string}>`
  cursor: pointer;
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
  color:white;
  :hover {
    background-color: red;
  }
  border:2px solid ${props=>gradeColor(props.grade)};
`;

interface SeatParams {
    seat:ISeat;
    selected:boolean;
    onSelect:(seat_no:number)=>void;
}

function Seat(params:SeatParams) {
    const seatID=params.seat.seat_no;
    return (
    <SeatBox onClick={()=>params.onSelect(params.seat.seat_no as number)} selected={params.selected} grade={params.seat.seat_grade_no}>
        {seatID}
    </SeatBox>
    );
}

export default Seat;