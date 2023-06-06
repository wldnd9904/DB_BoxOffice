import { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import TheaterManager from '../../utils/TheaterManager';
import {theaterListAtom } from '../../utils/recoilAtoms';
import ITheater from '../../interfaces/Theater';
import StaffTheaterView from './StaffTheaterView';
import { useForm } from 'react-hook-form';
import SeatsMaker from './StaffSeatsMaker';
import { demoSeats, demoTheater } from '../../utils/demos';
import { ISeats } from '../../interfaces/Seat';
import { ITheaterDictionary } from '../../interfaces/Dictionary';

function StaffTheaterList(){
  const [theaterList, setTheaterList] = useRecoilState(theaterListAtom);
  const [showNewTheater, setShowNewTheater] = useState<boolean>(false);
  const [isSeatsDone, setIsSeatsDone] = useState<boolean>(false);
  const [seats, setSeats] = useState<ISeats>({});
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ITheater>();
  const [newTheaterReady, setNewTheaterReady] = useState<boolean>(false);
  const newTheater = () => {
    setShowNewTheater(true);
    reset();
  }
  const handleClose = () => {
    setShowNewTheater(false);
  }
  const seatDone = async (seats:ISeats) => {
    setIsSeatsDone(true);
    setSeats(seats);
  }
  const onValid = async (data:ITheater) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await TheaterManager.addTheater(data);
    let tmpSeats:ISeats = {};
    Object.assign(tmpSeats,seats);
    await TheaterManager.putSeats(tmpSeats,data.thea_no);
    alert("새 상영관이 추가되었습니다.")
    await setTheaterList(await TheaterManager.getTheaterList());
    handleClose();
  };
  useEffect(()=>{
    (async()=>{
        await setTheaterList(await TheaterManager.getTheaterList());
    })();
  },[]);
    return(
        <>
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { theaterList.length>0?
                theaterList.map((theater:ITheater, idx) => (
                    <Col key={idx}>
                        <StaffTheaterView key={idx} {...theater}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newTheater}>새 상영관</Button>
            {
                <Modal
                show={showNewTheater}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>상영관 추가</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleSubmit(onValid)}>
                        {Object.keys(demoTheater).map((key,idx)=>(
                        <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
                          <Form.Label>{ITheaterDictionary[key]}</Form.Label>
                          <Form.Control {...register(key, {required:true})} type="text"/>
                        </Form.Group>))
                        }
                      <SeatsMaker thea_no={0} seats={false} onSelect={(seats)=>seatDone(seats)} />
                      <Button variant="primary" type="submit" disabled={!isSeatsDone} >
                          상영관 추가
                      </Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
                </Modal>
            }
        </div>
        </>
    );
}

export default StaffTheaterList;