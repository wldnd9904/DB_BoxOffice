import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { IRegisterForm } from '../../interfaces/Customer';
import CustomerManager from '../../utils/CustomerManager';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { setCookie } from '../../utils/api/api';

const ModalHeader = styled(Modal.Header)`
  padding-bottom:0px;
  border:none;
`;
const PhoneNo82 = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  input {
    margin-left:10px;
  }
`;
interface IModal{
  show: boolean;
  handleClose: ()=>void;
};

function RegisterForm({show, handleClose}:IModal) {
  const [isMember, setIsMember] = useState<boolean>(true);
  const { register, handleSubmit, formState:{errors}, setError, reset} = useForm<IRegisterForm>();
  const [disable, setDisable] = useState<boolean>(false);
  const onValid = async (data:IRegisterForm) => {
    setDisable(true);
    if(data.password1 !== data.cus_pw){
      setError("password1", {message:"비밀번호가 일치하지 않습니다."},{shouldFocus:true});
      setDisable(false);
      return;
    }
    let code=0;
    console.log(data);
    let apiData;
    if(isMember)apiData= await CustomerManager.register(data).then(response=>{console.log("성공"); return response}).catch(error=>{console.log("에러");return error});
    else apiData= await CustomerManager.nregister(data).then(response=>{console.log("성공"); return response}).catch(error=>{console.log("에러");return error});
    if(apiData.status) code=apiData.status;
    if(apiData.response) code=apiData.response.status;
    if(code!=201)switch(code){
      case 400:{
        alert("입력값에 문제가 있습니다.");
        setDisable(false);
        break;
      }
      case 409:{
        alert("이메일이나 전화번호가 중복되었습니다.");
        setDisable(false);
        break;
      }
      case 500:{
        alert("서버 에러.");
        setDisable(false);
        break;
      }
      default:{
        alert("기타 에러.");
        setDisable(false);
        break;
      }
    }else{
      alert("회원가입이 완료되었습니다. 로그인 해주세요.");
      setCookie("jwt", apiData.data, {
        path:"/",
      });
      reset();
      setDisable(false);
      handleClose();
    }
  };
  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <ModalHeader closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </ModalHeader>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link active={isMember} onClick={()=>{setIsMember(true);reset()}}>회원</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={!isMember} onClick={()=>{setIsMember(false);reset()}}>비회원</Nav.Link>
        </Nav.Item>
      </Nav>
        <Form onSubmit={handleSubmit(onValid)}>
      <Modal.Body>
        {isMember?
        //회원
        <>
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
                <Form.Control {...register("cus_pw", {
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
                {errors?.cus_pw? (<Badge bg="secondary">{`${errors?.cus_pw?.message}`}</Badge>):null}
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
                  value:/^[0-9]{13}$/,
                  message:"주민번호 형식이 맞지 않습니다."
                }})} type="" placeholder="숫자13자리"/>
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
                <PhoneNo82>
                  +82
                <Form.Control {...register("phone_no", {
                  required:"값이 필요합니다.",
                  pattern:{
                    value:/^1[0-9]{7,9}$/,
                    message:"전화번호 형식이 맞지 않습니다."
                  }})} type="tel" placeholder="1012345678"/>
                </PhoneNo82>
                {errors?.phone_no? (<Badge bg="secondary">{`${errors?.phone_no?.message}`}</Badge>):null}
              </Form.Group>
            </Row>
          </>
          :
        //비회원
        <>
        <Row className="mb-3">
          <Form.Group controlId="formPhone">
              <Form.Label>전화번호</Form.Label>
              <PhoneNo82>
              +82
              <Form.Control {...register("phone_no", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^1[0-9]{7,9}$/,
                  message:"전화번호 형식이 맞지 않습니다."
                }})} type="tel" placeholder="1012345678"/>
                </PhoneNo82>
              {errors?.phone_no? (<Badge bg="secondary">{`${errors?.phone_no?.message}`}</Badge>):null}
            </Form.Group>
        </Row>
          <Row className="mb-3">
            <Form.Group controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control {...register("cus_pw", {
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
              {errors?.cus_pw? (<Badge bg="secondary">{`${errors?.cus_pw?.message}`}</Badge>):null}
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
                value:/^[0-9]{13}$/,
                message:"주민번호 형식이 맞지 않습니다."
              }})} type="" placeholder="숫자13자리"/>
            {errors?.resident_no? (<Badge bg="secondary">{`${errors?.resident_no?.message}`}</Badge>):null}
          </Form.Group>
        </Row>
        </>
        }
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