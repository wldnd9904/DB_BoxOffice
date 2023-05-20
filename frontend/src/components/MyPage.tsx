import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { customerAtom } from '../utils/recoilAtoms';
import ICustomer, { IRegisterForm } from '../interfaces/Customer';
import CustomerManager from '../utils/CustomerManager';

interface IModal{
  show: boolean;
  handleClose: ()=>void;
};

function MyPage({show, handleClose}:IModal) {
  const [userData, setUserData] = useRecoilState<ICustomer>(customerAtom);
  const { register, handleSubmit, formState:{errors}, setError, reset, setValue} = useForm<IRegisterForm>();
  const [disable, setDisable] = useState<boolean>(false);
  const onValid = async (data:IRegisterForm) => {
    setDisable(true);
    if(data.password1 !== data.password){
      setError("password1", {message:"비밀번호가 일치하지 않습니다."},{shouldFocus:true});
      setDisable(false);
      return;
    }
    console.log(await CustomerManager.editUserData(data));
    alert("회원정보가 수정되었습니다.");
    reset();
    setDisable(false);
    handleClose();
  };
  useEffect(() => {
    if(userData)reset(userData);
    setValue("password1","");
  },[]);
  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>내 정보</Modal.Title>
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
            })} placeholder="손흥민" disabled/>
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
                }})} type="" placeholder="000000-0000000" disabled/>
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
                }})} type="number" placeholder="0" disabled/>
              {errors?.point? (<Badge bg="secondary">{`${errors?.point?.message}`}</Badge>):null}
            </Form.Group>
          <Form.Group as={Col} controlId="formGrade">
              <Form.Label>등급</Form.Label>
              <Form.Control {...register("cus_grade_no", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[0-9]+$/,
                  message:"등급 형식이 맞지 않습니다."
                }})} type="number" placeholder="0" disabled/>
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
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}

export default MyPage;