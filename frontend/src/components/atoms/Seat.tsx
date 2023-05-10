import styled from "styled-components";
import { ISeat } from "../../interfaces/Theater";

const SeatBox = styled.div`
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

interface SeatParams {
    seat:ISeat;
    onSelect:()=>void;
}
function Seat(params:SeatParams) {
    const seatID=params.seat.seatID;
    return (
    <SeatBox onClick={params.onSelect}>
        {seatID}
    </SeatBox>
    );
}

export default Seat;