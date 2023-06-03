import { useState } from "react";
import { Card, CloseButton, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ISchedule from "../../interfaces/Schedule";
import ScheduleManager from "../../utils/ScheduleManager";
import { scheduleListAtom } from "../../utils/recoilAtoms";
import { YYYYMMDD } from "../../utils/timeFormatter";

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffScheduleView(param:ISchedule) {
  const [scheduleList, setScheduleList] = useRecoilState(scheduleListAtom);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ISchedule>();
  const handleOpen = () => {
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const remove = async (sche_no:string) => {
    await ScheduleManager.deleteSchedule(sche_no);
    alert("삭제되었습니다.");
    await setScheduleList(await ScheduleManager.getAllScheduleList());
  } 
  const onValid = async (data:ISchedule) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await ScheduleManager.editSchedule(data);
    alert("수정 완료.")
    await setScheduleList(await ScheduleManager.getAllScheduleList());
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(`${param.mov_no}`)}}/>
          <Card.Title>{`${param.sched_no}: 영화 ${param.mov_no}(${param.run_type}), 상영관 ${param.thea_no}, ${YYYYMMDD(param.run_date)}~${YYYYMMDD(param.run_end_date)}`}</Card.Title>
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
        <Modal.Title>상영일정 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
          {param?
          keys.map((key,idx)=>(
            <Form.Group key={idx} controlId={`form${key}`}>
              <Form.Label>{key}</Form.Label>
              <Form.Control {...register(key, {required:false})} type="textarea"/>
            </Form.Group>)
          )
          :
          null
          }
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

export default StaffScheduleView;