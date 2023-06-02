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
  const [seats,setSeats] = useState<ISeats>({});
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ITheater>();
  const handleOpen = async () => {
    setShow(true);
    await setSeats(demoSeats);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const remove = async (thea_no:string) => {
    await TheaterManager.deleteTheater(thea_no);
    alert("삭제되었습니다.");
    await setTheaterList(await TheaterManager.getTheaterList());
  } ;
  const onValid = async (data:ITheater) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await TheaterManager.editTheater(data);
    alert("수정 완료.")
    await setTheaterList(await TheaterManager.getTheaterList());
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
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
            <Form.Group key={idx} controlId={`form${key}`}>
              <Form.Label>{key}</Form.Label>
              <Form.Control {...register(key, {required:false})} type="text"/>
            </Form.Group>)
          ):null}
          <SeatsMaker thea_no={param.thea_no} seats={seats} onSelect={function (): void {
              throw new Error('Function not implemented.');
            } } />
          <Button variant="primary" type="submit">
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