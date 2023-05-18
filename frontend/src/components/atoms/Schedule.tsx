import styled from "styled-components";
import ISchedule from "../../interfaces/Schedule";


const ScheduleContainer = styled.div`
    cursor: pointer;
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
    margin-top:5px;
    flex-direction: row;
    justify-content: space-evenly;
`;
const StartAt = styled.span`
    font-size:2em;
    font-weight:bold;
`;
const EndAt = styled.span`
    font-size:.8em;
    font-weight:bold;
    color:darkgray;
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
    const shour = params.schedule.run_date.getHours().toString().padStart(2,'0');
    const smin = params.schedule.run_date.getMinutes().toString().padStart(2,'0');
    const ehour = params.schedule.run_end_date.getHours().toString().padStart(2,'0');
    const emin = params.schedule.run_end_date.getMinutes().toString().padStart(2,'0');
    return (
    <ScheduleContainer onClick={params.onSelect}>
        <StartAt>{`${shour}:${smin}`}</StartAt>
        <EndAt>{`~${ehour}:${emin}`}</EndAt>
        <HStack>
            <Seats><span>23</span> / 100</Seats>
            <Theater>{`${params.schedule.thea_no}관`}</Theater>
        </HStack>
    </ScheduleContainer>
    );
}

export default Schedule;