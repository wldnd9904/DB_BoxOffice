import { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { movieListAtom, scheduleListAtom, seatGradeNameAtom, theaterListAtom } from '../../utils/recoilAtoms';
import ScheduleManager from '../../utils/ScheduleManager';
import ISchedule from '../../interfaces/Schedule';
import StaffScheduleView from './StaffScheduleView';
import TheaterManager from '../../utils/TheaterManager';
import MovieManager from '../../utils/MovieManager';
import { useForm } from 'react-hook-form';
import { demoSchedule } from '../../utils/demos';
import { IScheduleDictionary } from '../../interfaces/Dictionary';
import CodeManager from '../../utils/CodeManager';

function StaffScheduleList(){
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListAtom);
  const [movieList, setMovieList] = useRecoilState(movieListAtom);
  const [theaterList, setTheaterList] = useRecoilState(theaterListAtom)
  const [showNewSchedule, setShowNewSchedule] = useState<boolean>(false);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ISchedule>();
  const [seatGradeList,setSeatGradeList] = useRecoilState(seatGradeNameAtom);
  const newTheater = () =>{
    setShowNewSchedule(true);
    reset();
  };
  const handleClose = () => setShowNewSchedule(false);
  const loadSchedule = () => {(async ()=>{
    setMovieList(await MovieManager.getMovieList());
    setScheduleList(await ScheduleManager.getAllScheduleList());
    setTheaterList(await TheaterManager.getTheaterList());
  })();}
  const onValid = async (data:ISchedule) => {
    await ScheduleManager.addSchedule(data);
    alert("새 상영일정이 추가되었습니다.")
    setMovieList(await MovieManager.getMovieList());
    setScheduleList(await ScheduleManager.getAllScheduleList());
    setTheaterList(await TheaterManager.getTheaterList());
    handleClose();
  };
  useEffect(()=>{
    (async()=>{
      setMovieList(await MovieManager.getMovieList());
      setScheduleList(await ScheduleManager.getAllScheduleList());
      setTheaterList(await TheaterManager.getTheaterList());
      setSeatGradeList(await CodeManager.getSeatGradeData());
    })();
  },[])
  return(
    <div style={{padding:"20px"}}>
          <Button style={{marginBottom:"20px"}} variant="primary" onClick={loadSchedule}>새로고침</Button>
            <Row xs={1} md={1} lg={1} className="g-4">
                {scheduleList.map((schedule:ISchedule, idx) => (
                    <Col key={idx}>
                        <StaffScheduleView key={idx} {...schedule}/>
                    </Col>
                ))}
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newTheater}>새 상영일정</Button>
            {
    <Modal
    show={showNewSchedule}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>상영일정 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
        {Object.keys(demoSchedule).map((key,idx)=>{
            switch(key){
              case "sched_no": return null;
              case "mov_no": 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IScheduleDictionary[key]}</Form.Label>
                <Form.Select {...register(key, {required:true})}>
                  {movieList?movieList.map((movie,index)=>(<option key={index} value={movie.mov_no}>{`${movie.mov_no}: ${movie.mov_nm} (${movie.run_time_min}분)`}</option>)):null}
                </Form.Select>
              </Form.Group>;
              case "thea_no": 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IScheduleDictionary[key]}</Form.Label>
                <Form.Select {...register(key, {required:true})}>
                  {theaterList?theaterList.map((theater,index)=>(<option key={index} value={theater.thea_no}>{`${theater.thea_no}: ${theater.thea_nm}`}</option>)):null}
                </Form.Select>
              </Form.Group>;
              case "run_date": 
              case "run_end_date":
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IScheduleDictionary[key]}</Form.Label>
                <Form.Control {...register(key, {required:true})} type="datetime-local"/>
              </Form.Group>
              default: 
      return  <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                <Form.Label>{IScheduleDictionary[key]}</Form.Label>
                <Form.Control {...register(key, {required:true})} type="text"/>
              </Form.Group>
            }
          })}
          {
          seatGradeList&&Object.keys(seatGradeList).length>0?
            Object.keys(seatGradeList).map((key,idx) =>{
            if(key!="CD00500")return <Form.Group style={{marginTop:"10px"}} key={100+idx} controlId={`form${key}`}>
            <Form.Label>{seatGradeList[key].seat_grade_nm} 가격</Form.Label>
            <Form.Control {...register(seatGradeList[key].seat_grade_no, {required:true})} type="number"/>
          </Form.Group>
          }):null}
          <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
              상영일정 추가
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>}
        </div>
    );
}

export default StaffScheduleList;