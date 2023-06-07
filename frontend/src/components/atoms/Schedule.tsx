import styled from "styled-components";
import ISchedule from "../../interfaces/Schedule";
import { HHMM } from "../../utils/timeFormatter";


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
    return (
    <ScheduleContainer onClick={params.onSelect}>
        <StartAt>{HHMM(new Date(params.schedule.run_date))}</StartAt>
        <EndAt>~{HHMM(new Date(params.schedule.run_end_date))}</EndAt>
        <HStack>
            <Seats><span>{params.schedule.cur_people??0}</span> / {params.schedule.max_people??0}</Seats>
            <Theater>{`${params.schedule.thea_nm??""}`}</Theater>
        </HStack>
    </ScheduleContainer>
    );
}

export default Schedule;