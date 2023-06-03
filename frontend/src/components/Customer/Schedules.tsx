import styled from "styled-components";
import DatePicker from "./DatePicker";
import { useRecoilState, useRecoilValue } from "recoil";
import IMovie from "../../interfaces/Movie";
import ISchedule from "../../interfaces/Schedule";
import { demoSchedules } from "../../utils/demos";
import { scheduleListAtom, selectedMovieAtom, selectedScheduleAtom } from "../../utils/recoilAtoms";
import Grade from "../atoms/Grade";
import Schedule from "../atoms/Schedule";
import ScheduleManager from "../../utils/ScheduleManager";
import { useEffect, useState } from "react";

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
    const [scheduleList, setScheduleList] = useRecoilState<ISchedule[]>(scheduleListAtom);
    const [filteredSchedList, setFilteredSchedList] = useState<ISchedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useRecoilState<ISchedule>(selectedScheduleAtom);
    const [types, setTypes] = useState<string[]>([]);
    useEffect(()=>{
        (async()=>{
            setScheduleList(await ScheduleManager.getAllScheduleList());
            let tmpScheduleList:ISchedule[]=[];
            Object.assign(tmpScheduleList, scheduleList);
            tmpScheduleList=tmpScheduleList.filter((schedule)=>schedule.mov_no == selectedMovie.mov_no);
            let tmpTypes: string[] = [];
            tmpScheduleList.forEach((schedule)=>tmpTypes.push(schedule.run_type));
            tmpTypes = tmpTypes.filter((element, index) => {
                return tmpTypes.indexOf(element) === index;
            });
            setTypes(tmpTypes)
            setFilteredSchedList(tmpScheduleList);
        })();
    },[]);
    const onDateSelect = (date:Date) => {
        let tmpScheduleList:ISchedule[]=[];
        Object.assign(tmpScheduleList, scheduleList);
        tmpScheduleList=tmpScheduleList.filter((schedule)=>(schedule.mov_no == selectedMovie.mov_no && schedule.run_date.getDate()== date.getDate()));
        let tmpTypes: string[] = [];
        tmpScheduleList.forEach((schedule)=>tmpTypes.push(schedule.run_type));
        tmpTypes = tmpTypes.filter((element, index) => {
            return tmpTypes.indexOf(element) === index;
        });
        setTypes(tmpTypes)
        setFilteredSchedList(tmpScheduleList);
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
            {types.map((type,idx)=>
            <div key={idx}>
            <Theater>{type}</Theater>
            <SchedulesList>
                {scheduleList.filter(schedule=>schedule.run_type===type).map((schedule,idx)=>
                <Schedule key={idx} schedule={schedule} onSelect={()=>onScheduleSelect(schedule)}/>
                )}
            </SchedulesList>
            </div>
            )}
        </ListContainer>
    </SchedulesContainer>
    );
}

export default Schedules;