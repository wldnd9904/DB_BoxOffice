import styled from "styled-components";
import DatePicker from "./DatePicker";
import { useRecoilState, useRecoilValue } from "recoil";
import IMovie from "../../interfaces/Movie";
import ISchedule from "../../interfaces/Schedule";
import { demoSchedules } from "../../utils/demos";
import { allScheduleDatesAtom, scheduleListAtom, selectedMovieAtom, selectedScheduleAtom, selectedTheaterAtom } from "../../utils/recoilAtoms";
import Grade from "../atoms/Grade";
import Schedule from "../atoms/Schedule";
import ScheduleManager from "../../utils/ScheduleManager";
import { useEffect, useState } from "react";
import ITheater from "../../interfaces/Theater";
import TheaterManager from "../../utils/TheaterManager";

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
    const [allScheduleDates, setAllScheduleDates] = useRecoilState(allScheduleDatesAtom);
    const [scheduleList, setScheduleList] = useRecoilState<ISchedule[]>(scheduleListAtom);
    const [filteredSchedList, setFilteredSchedList] = useState<ISchedule[]>([]);
    const [selectedTheater,setSelectedTheater] = useRecoilState<ITheater>(selectedTheaterAtom);
    const [selectedSchedule, setSelectedSchedule] = useRecoilState<ISchedule>(selectedScheduleAtom);
    const [types, setTypes] = useState<string[]>([]);
    useEffect(()=>{
        (async()=>{
            if(scheduleList.length==0){let tmpAllScheduleList = await ScheduleManager.getAllScheduleList();
            setScheduleList(tmpAllScheduleList);
            }
            let tmpScheduleList:ISchedule[]=[];
            Object.assign(tmpScheduleList, scheduleList);
            tmpScheduleList=tmpScheduleList.filter((schedule)=>((schedule.mov_no == selectedMovie.mov_no)));
            console.log(tmpScheduleList);
            setAllScheduleDates(tmpScheduleList.map(schedule=>(`${new Date(schedule.run_date).getMonth()}-${new Date(schedule.run_date).getDate()}`)));
            tmpScheduleList=tmpScheduleList.filter((schedule)=>((new Date(schedule.run_date).getDate()== (new Date()).getDate()) && (new Date(schedule.run_date).getMonth()== (new Date()).getMonth())));
            let tmpTypes: string[] = [];
            tmpScheduleList.forEach((schedule)=>tmpTypes.push(schedule.run_type));
            tmpTypes = tmpTypes.filter((element, index) => {
                return tmpTypes.indexOf(element) === index;
            });
            setTypes(tmpTypes)
            setFilteredSchedList(tmpScheduleList);
        })();
    },[scheduleList]);
useEffect(()=>{
        (async()=>{
        let tmpAllScheduleList = await ScheduleManager.getAllScheduleList();
                setScheduleList(tmpAllScheduleList);
        })();
    },[]);
    const onDateSelect = (date:Date) => {
        console.log(date);
        let tmpScheduleList:ISchedule[]=[];
        Object.assign(tmpScheduleList, scheduleList);
        tmpScheduleList.map(schedule=>{console.log(new Date(schedule.run_date).getDate());console.log(new Date(schedule.run_date).getMonth())})
        tmpScheduleList=tmpScheduleList.filter((schedule)=>((schedule.mov_no == selectedMovie.mov_no) && (new Date(schedule.run_date).getDate()== date.getDate()) &&(new Date(schedule.run_date).getMonth()== date.getMonth())));
        console.log(tmpScheduleList)
        let tmpTypes: string[] = [];
        tmpScheduleList.forEach((schedule)=>tmpTypes.push(schedule.run_type));
        tmpTypes = tmpTypes.filter((element, index) => {
            return tmpTypes.indexOf(element) === index;
        });
        setTypes(tmpTypes)
        setFilteredSchedList(tmpScheduleList);
    };
    const onScheduleSelect = async (schedule:ISchedule) => {
        //TODO: 스케줄 꽉 찼는지 검사 
        console.log(schedule)
        setSelectedSchedule(schedule);
        let tmpTheater = {};
        Object.assign(tmpTheater,await TheaterManager.getTheater(schedule.thea_no))
        console.log(tmpTheater)
        setSelectedTheater(tmpTheater as ITheater);
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
            {filteredSchedList.length==0?
            <Theater>조회 가능한 상영시간이 없습니다. 다른 날짜를 선택해주세요.</Theater>
            :null
            }
            {types.map((type,idx)=>
            <div key={idx}>
            <Theater>{type}</Theater>
            <SchedulesList>
                {filteredSchedList.filter(schedule=>schedule.run_type===type).map((schedule,idx)=>
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