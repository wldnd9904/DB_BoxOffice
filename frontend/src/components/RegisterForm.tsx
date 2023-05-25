import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import ICustomer, { IRegisterForm } from '../interfaces/Customer';
import CustomerManager from '../utils/CustomerManager';

interface IModal{
  show: boolean;
  handleClose: ()=>void;
};

function RegisterForm({show, handleClose}:IModal) {
  const { register, handleSubmit, formState:{errors}, setError, reset} = useForm<IRegisterForm>();
  const [disable, setDisable] = useState<boolean>(false);
  const onValid = async (data:IRegisterForm) => {
    setDisable(true);
    if(data.password1 !== data.password){
      setError("password1", {message:"비밀번호가 일치하지 않습니다."},{shouldFocus:true});
      setDisable(false);
      return;
    }
    if(await CustomerManager.register(data as ICustomer)==="ok"){
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      reset();
      setDisable(false);
      handleClose();
    }else{
      alert("중복된 아이디입니다.");
      setDisable(false);
    }
  };
  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
        <Form onSubmit={handleSubmit(onValid)}>
      <Modal.Body>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control {...register("email", {
              required:"값이 필요합니다.",
              pattern:{
                value: /^\w+@((\w)+\.)+\w+$/,
                message: "이메일 형식이 맞지 않습니다."
              }
            })} type="email" placeholder="heungmin@uos.ac.kr" />
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
              <Form.Group controlId="formPassword">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control {...register("password1", {required:"값이 필요합니다."})} type="password" placeholder="Password" />
                {errors?.password1? (<Badge bg="secondary">{`${errors?.password1?.message}`}</Badge>):null}
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
          {errors?.extraError? (<Badge bg="secondary">{`${errors?.extraError?.message}`}</Badge>):null}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit" disabled={disable}>
              회원가입
          </Button>
      </Modal.Footer>
        </Form>
    </Modal>
  );
}

export default RegisterForm;