import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Badge, CloseButton, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import ICustomer from '../../interfaces/Customer';
import CustomerManager from '../../utils/CustomerManager';


const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

interface UserParams {
  customer:ICustomer;
  onEdit:(customer:ICustomer)=>void;
  onDelete:()=>void;
}

function User(params:UserParams) {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<ICustomer>();
  const handleOpen = () => {
    setShow(true);
    reset(params.customer);
  }
  const handleClose = () => setShow(false);
  const remove = async (cus_no:string|number) => {
    await CustomerManager.deleteUser(cus_no);
    alert("삭제되었습니다.");
    params.onDelete();
  } 
  const onValid = async (data:ICustomer) => {
    reset();
    await CustomerManager.editUserDataStaff(data);
    alert("수정 완료.")
    params.onEdit(data);
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(params.customer.cus_no)}}/>
          <Card.Title>{`${params.customer.cus_no}: ${params.customer.cus_nm}`}</Card.Title>
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
        <Modal.Title>{params.customer.cus_no}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control {...register("email", {
              required:"값이 필요합니다.",
              pattern:{
                value: /^\w+@((\w)+\.)+\w+$/,
                message: "이메일 형식이 맞지 않습니다."
              }
            })} type="email" placeholder="heungmin@uos.ac.kr" disabled/>
            {errors?.email? (<Badge bg="secondary">{`${errors?.email?.message}`}</Badge>):null}

          </Form.Group>
            <Row className="mb-3">
            <Form.Group controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control {...register("password", {
                required:"값이 필요합니다.",
                minLength:{
                  value: 7,
                  message: "비밀번호는 7글자 이상이어야 합니다."
                },
                pattern:{
                  value: /^[A-Za-z0-9!@#$%^&*()_+=-]+$/,
                  message: "비밀번호는 영어와 숫자, 특수문자로 이루어 져야 합니다."
                }
                
                })} type="password" placeholder="Password" />
              {errors?.password? (<Badge bg="secondary">{`${errors?.password?.message}`}</Badge>):null}
              </Form.Group>
              </Row>

          <Row className="mb-3">
            <Form.Group controlId="formName">
              <Form.Label>이름</Form.Label>
              <Form.Control {...register("cus_nm", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[A-Za-z\s가-힣]+$/,
                  message:"이름 형식이 맞지 않습니다."
                }
            })} placeholder="손흥민"/>
              {errors?.cus_nm? (<Badge bg="secondary">{`${errors?.cus_nm?.message}`}</Badge>):null}
            </Form.Group>
            </Row>

            <Row className="mb-3">
          <Form.Group controlId="formResino">
              <Form.Label>주민번호</Form.Label>
              <Form.Control {...register("resident_no", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[0-9]{6}\-[0-9]{7}$/,
                  message:"주민번호 형식이 맞지 않습니다."
                }})} type="" placeholder="000000-0000000"/>
              {errors?.resident_no? (<Badge bg="secondary">{`${errors?.resident_no?.message}`}</Badge>):null}
            </Form.Group>
            </Row>

            <Row className="mb-3">
          <Form.Group controlId="formResino">
              <Form.Label>주소</Form.Label>
              <Form.Control {...register("address", {
                required:"값이 필요합니다.",})} type="" placeholder="지구"/>
              {errors?.address? (<Badge bg="secondary">{`${errors?.address?.message}`}</Badge>):null}
            </Form.Group>
            </Row>

            <Row className="mb-3">
          <Form.Group controlId="formPhone">
              <Form.Label>전화번호</Form.Label>
              <Form.Control {...register("phone_no", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[0-9]{9,11}$/,
                  message:"전화번호 형식이 맞지 않습니다."
                }})} type="tel" placeholder="01012345678"/>
              {errors?.phone_no? (<Badge bg="secondary">{`${errors?.phone_no?.message}`}</Badge>):null}
            </Form.Group>
            </Row>

            <Row className="mb-3">
          <Form.Group as={Col} controlId="formPoint">
              <Form.Label>포인트</Form.Label>
              <Form.Control {...register("point", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[0-9]+$/,
                  message:"포인트 형식이 맞지 않습니다."
                }})} type="number" placeholder="0"/>
              {errors?.point? (<Badge bg="secondary">{`${errors?.point?.message}`}</Badge>):null}
            </Form.Group>
          <Form.Group as={Col} controlId="formGrade">
              <Form.Label>등급</Form.Label>
              <Form.Control {...register("cus_grade_no", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[0-9]+$/,
                  message:"등급 형식이 맞지 않습니다."
                }})} type="number" placeholder="0"/>
              {errors?.cus_grade_no? (<Badge bg="secondary">{`${errors?.cus_grade_no?.message}`}</Badge>):null}
            </Form.Group>
            </Row>

            <Row className="mb-3">
          <Form.Group controlId="formGrade">
              <Form.Label>가입일자</Form.Label>
              <Form.Control {...register("regi_date")} type="date" placeholder="" disabled/>
              {errors?.regi_date? (<Badge bg="secondary">{`${errors?.regi_date?.message}`}</Badge>):null}
            </Form.Group>
            </Row>

          <Button variant="primary" type="submit">
              정보 수정
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
}

export default User;