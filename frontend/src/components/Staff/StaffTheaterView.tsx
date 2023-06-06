import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CloseButton, Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import ITheater from '../../interfaces/Theater';
import { theaterListAtom } from '../../utils/recoilAtoms';
import TheaterManager from '../../utils/TheaterManager';
import { demoSeats } from '../../utils/demos';
import Seats from '../Customer/Seats';
import SeatsMaker from './StaffSeatsMaker';
import { ISeats } from '../../interfaces/Seat';
import SeatManager from '../../utils/SeatManager';
import { ITheaterDictionary } from '../../interfaces/Dictionary';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffTheaterView(param:ITheater) {
  const [theaterList, setTheaterList] = useRecoilState(theaterListAtom);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [isSeatsDone, setIsSeatsDone] = useState<boolean>(false);
  const [seats, setSeats] = useState<ISeats>({});
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ITheater>();
  const handleOpen = async () => {
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const remove = async (thea_no:string) => {
    await TheaterManager.deleteTheater(thea_no);
    alert("삭제되었습니다.");
    await setTheaterList(await TheaterManager.getTheaterList());
  } ;
  const seatDone = async (seats:ISeats) => {
    setIsSeatsDone(true);
    setSeats(seats);
  }
  const onValid = async (data:ITheater) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await TheaterManager.editTheater(data);
    let tmpSeats:ISeats = {};
    Object.assign(tmpSeats,seats);
    await TheaterManager.updateSeats(tmpSeats,data.thea_no);
    alert("수정 완료.")
    await setTheaterList(await TheaterManager.getTheaterList());
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: 'auto', maxWidth: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(`${param.thea_no}`)}}/>
          <Card.Title>{`${param.thea_no}: ${param.thea_nm}`}</Card.Title>
          <Button variant="primary" onClick={handleOpen}>수정</Button>
        </Card.Body>
      </Card>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>상영관 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
          {param?
          keys.map((key,idx)=>(
            <Form.Group style={{marginTop:"10px"}} key={idx} controlId={`form${key}`}>
              <Form.Label>{ITheaterDictionary[key]}</Form.Label>
              <Form.Control {...register(key, {required:false})} type="text"/>
            </Form.Group>)
          ):null}
          <SeatsMaker thea_no={param.thea_no} seats={true} onSelect={(seats)=>seatDone(seats)} />
          <Button variant="primary" type="submit" disabled={!isSeatsDone}>
              정보 수정
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default StaffTheaterView;