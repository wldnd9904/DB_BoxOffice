import { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import IPayment from "../../interfaces/Payment";
import { paymentListAtom } from "../../utils/recoilAtoms";
import { IPaymentDictionary } from "../../interfaces/Dictionary";


const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffPaymentView(param:IPayment) {
  const [paymentList, setPaymentList] = useRecoilState(paymentListAtom);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IPayment>();
  const handleOpen = () => {
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  return (
    <>
      <Card as={Hover} style={{ width: 'auto', maxWidth: '40rem'}}>
        <Card.Body>
          {/*<CloseButton style={{float:"right"}} onClick={()=>{remove(`${param.mov_no}`)}}/>*/}
          <Card.Title>{`${param.pay_no}: 고객번호 ${param.cus_no}, ${param.pay_state?"결제됨":"결제되지않음"}`}</Card.Title>
          <Button variant="primary" onClick={handleOpen}>자세히</Button>
        </Card.Body>
      </Card>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>결제 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {param?
          keys.map((key,idx)=>(
            <Form.Group key={idx} style={{marginTop:"10px"}} controlId={`form${key}`}>
              <Form.Label>{IPaymentDictionary[key]}</Form.Label>
              <Form.Control {...register(key, { required: false })} type="textarea" disabled/>
            </Form.Group>)
          )
          :
          null
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default StaffPaymentView;