import styled from "styled-components";
import { demoSchedules } from "../utils/demos";
import Schedule from "./atoms/Schedule";
import DatePicker from "./DatePicker";
import { useRecoilState, useRecoilValue } from "recoil";
import ISchedule from "../interfaces/Schedule";
import { selectedMovieAtom, selectedScheduleAtom } from "../utils/recoilAtoms";
import IMovie from "../interfaces/Movie";
import Grade from "./atoms/Grade";

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
const Title = styled.div`
    display:flex;
    text-align:center;
    font-size:1.5em;
    font-weight:bold;
    margin:20px auto;
    padding:0 30px;
    div {
        margin-right:5px;
    }
`;
const Theater = styled.div`
    text-align:left;
    font-size:1.3em;
    font-weight:bold;
    margin:10px 0 0 10px;
`;
interface SchedulesParams {
    onSelect: () => void;
}
function Schedules(params:SchedulesParams) {
    const selectedMovie = useRecoilValue<IMovie>(selectedMovieAtom);
    const [selectedSchedule, setSelectedSchedule] = useRecoilState<ISchedule>(selectedScheduleAtom);
    const onDateSelect = (date:Date) => {
    };
    const onScheduleSelect = (schedule:ISchedule) => {
        //TODO: 스케줄 꽉 찼는지 검사 
        setSelectedSchedule(schedule);
        params.onSelect();
    }
    return (
    <SchedulesContainer>
        <DatePicker getSelectedDay={onDateSelect}/>
        <ListContainer>
            <Title>
                <Grade grade={selectedMovie.mov_grade_no} />
                {selectedMovie.mov_nm}
            </Title>
            <Theater>2D | 자막</Theater>
            <SchedulesList>
            {
                    demoSchedules.map((schedule,idx) => schedule.thea_no===1?<Schedule key={schedule.sched_no+""+idx} schedule={schedule} onSelect={()=>onScheduleSelect(schedule)} />:null)
                }
            </SchedulesList>
            <Theater>2D | 더빙</Theater>
            <SchedulesList>
                {
                    demoSchedules.map((schedule,idx) => schedule.thea_no===2?<Schedule key={schedule.sched_no+""+idx} schedule={schedule} onSelect={()=>onScheduleSelect(schedule)} />:null)
                }
            </SchedulesList>
        </ListContainer>
    </SchedulesContainer>
    );
}

export default Schedules;