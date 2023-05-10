import styled from "styled-components";
import { ISchedule } from "../../interfaces/Schedule";

const ScheduleContainer = styled.div`
    display:flex;
    width: 200px;
    height: 120px;
    border:1px solid lightgray;
    border-radius: 10px;
    transition: all 0.1s linear;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    :hover {
        transform: scale(1.03);
    }
    margin: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
const HStack = styled.div`
    display:flex;
    width:80%;
    margin-top:10px;
    flex-direction: row;
    justify-content: space-evenly;
`;
const StartAt = styled.span`
    font-size:2em;
    font-weight:bold;
`;
const Seats = styled.span`
    color:gray;
    font-size:1em;
    span {
        color:green;
    }
`;
const Theater = styled.span`
    color:gray;
    font-size:1em;
`;
interface ScheduleParams {
    schedule:ISchedule,
    onSelect:() => void,
}

function Schedule(params:ScheduleParams) {
    const hour = params.schedule.startAt.getHours().toString().padStart(2,'0');
    const min = params.schedule.startAt.getMinutes().toString().padStart(2,'0');
    return (
    <ScheduleContainer onClick={params.onSelect}>
        <StartAt>{`${hour}:${min}`}</StartAt>
        <HStack>
            <Seats><span>23</span> / 100</Seats>
            <Theater>{`${params.schedule.theaterID}관`}</Theater>
        </HStack>
    </ScheduleContainer>
    );
}

export default Schedule;