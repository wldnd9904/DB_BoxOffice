import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import MovieManager from '../../utils/MovieManager';
import { scheduleListAtom } from '../../utils/recoilAtoms';
import ScheduleManager from '../../utils/ScheduleManager';
import ISchedule from '../../interfaces/Schedule';
import StaffSchedule from '../../pages/Staff/StaffSchedule';

function StaffScheduleList(){
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListAtom);
  const newMovie = () => {(async ()=>{
    await MovieManager.addMovie();
    alert("새 상영일정이 추가되었습니다.");
    await setScheduleList(await ScheduleManager.getAllScheduleList());
  })();} 
   const loadSchedule = () => {(async ()=>{
    await setScheduleList(await ScheduleManager.getAllScheduleList());
  })();}
  useEffect(()=>{
    (async()=>{
      await setScheduleList(await ScheduleManager.getAllScheduleList());
    })();
  },[])
  //<Button style={{marginTop:"20px"}} variant="primary" onClick={loadMovie}>영화 안받아오기</Button>
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                {scheduleList.map((schedule:ISchedule, idx) => (
                    <Col key={idx}>
                        <StaffSchedule key={idx} {...schedule}/>
                    </Col>
                ))}
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newMovie}>새 영화</Button>
        </div>
    );
}

export default StaffScheduleList;