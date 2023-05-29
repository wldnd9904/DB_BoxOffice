import styled from "styled-components";
import { demoSchedules } from "../utils/demos";
import Schedule from "./atoms/Schedule";
import DatePicker from "./DatePicker";

const SchedulesContainer = styled.div`
  display: flex;
  margin-top: 70px;
  margin-left:auto;
  margin-right:auto;
  flex-direction: column;
  justify-content: center;
`;
const ListContainer = styled.div`
  display:flex;
  flex-direction: column;
  max-width:880px;
  margin-left:auto;
  margin-right:auto;
`;
const SchedulesList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap:wrap;
`;
const Title = styled.span`
    text-align:center;
    font-size:1.5em;
    font-weight:bold;
    margin:20px auto;
    padding:0 30px;
    background: url('https://github.com/wldnd9904/DB_BoxOffice/blob/master/frontend/images/grades/grade_12.png?raw=true') left no-repeat;
`;
const Theater = styled.span`
    text-align:left;
    font-size:1.3em;
    font-weight:bold;
    margin:10px 0 0 10px;
`;
interface SchedulesParams {
    onSelect: () => void;
}
function Schedules(params:SchedulesParams) {
    const onDateSelect = (date:Date) => {
    };
    return (
    <SchedulesContainer>
        <DatePicker getSelectedDay={onDateSelect}/>
        <ListContainer>
            <Title>너의 이름은</Title>
            <Theater>2D | 자막</Theater>
            <SchedulesList>
            {
                    demoSchedules.map((schedule,idx) => schedule.thea_no===1?<Schedule key={schedule.sched_no+""+idx} schedule={schedule} onSelect={params.onSelect} />:null)
                }                {
                    demoSchedules.map((schedule,idx) => schedule.thea_no===1?<Schedule key={schedule.sched_no+""+idx} schedule={schedule} onSelect={params.onSelect} />:null)
                }                {
                    demoSchedules.map((schedule,idx) => schedule.thea_no===1?<Schedule key={schedule.sched_no+""+idx} schedule={schedule} onSelect={params.onSelect} />:null)
                }
            </SchedulesList>
            <Theater>2D | 더빙</Theater>
            <SchedulesList>
                {
                    demoSchedules.map((schedule,idx) => schedule.thea_no===2?<Schedule key={schedule.sched_no+""+idx} schedule={schedule} onSelect={params.onSelect} />:null)
                }
            </SchedulesList>
        </ListContainer>
    </SchedulesContainer>
    );
}

export default Schedules;