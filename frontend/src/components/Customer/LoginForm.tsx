import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import ICustomer from '../../interfaces/Customer';
import CustomerManager from '../../utils/CustomerManager';
import { customerAtom } from '../../utils/recoilAtoms';
import { Nav } from 'react-bootstrap';
import { setSyntheticLeadingComments } from 'typescript';
import styled from 'styled-components';
import { demo, getCookie, setCookie } from '../../utils/api/api';
import { useCookies, withCookies } from 'react-cookie';

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
interface ILoginForm{
  email?: string;
  phone_no?: number|string;
  password: string;
  extraError?: string;
}

interface IModalForm{
  show: boolean;
  handleClose: ()=>void;
};

function LoginForm({show, handleClose}:IModalForm) {
  const [isMember, setIsMember] = useState<boolean>(true);
  const [userData, setUserData] = useRecoilState<ICustomer>(customerAtom);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { register, handleSubmit, formState:{errors},reset, setValue} = useForm<ILoginForm>();
  const onValid = async (data:ILoginForm) => {
    console.log(data);
    setDisabled(true);
    let code = 0;
    let apiData;
    if(isMember)apiData = await CustomerManager.login(data.email!,data.password).then(response=>{console.log(response);return response}).catch((error)=>error);
    else apiData = await CustomerManager.nlogin(`${data.phone_no}`,data.password).then(response=>{console.log(response);return response}).catch((error)=>error);
    if(apiData.status) code=apiData.status;
    if(apiData.response) code=apiData.response.status;
    console.log(apiData.response);
    console.log(code);
    if(demo) {
      setUserData(await CustomerManager.sessionLogin() as ICustomer);
      alert("데모 아이디로 로그인되었습니다.");
      setDisabled(false);
      reset();
      handleClose();
      return;
    }
    switch(code){
      case 200:{
        setCookie("jwt", apiData.data, {
          path:"/",
        });
        let loginData:ICustomer = await CustomerManager.sessionLogin() as ICustomer;
        setUserData(loginData);
        alert("로그인되었습니다.");
        setDisabled(false);
        reset();
        handleClose();
        break;
      }
      case 400:{
        alert("입력값에 문제가 있습니다.");
        handleClose();
        break;
      }
      case 401:{
        alert("로그인 정보가 맞지 않습니다.");
        setDisabled(false);
        break;
      }
      default:{
        alert("기타 에러.");
        setDisabled(false);
        break;
      }
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
        <Modal.Title>로그인</Modal.Title>
      </ModalHeader>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link active={isMember} onClick={()=>{setIsMember(true);reset()}}>회원</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={!isMember} onClick={()=>{setIsMember(false);reset()}}>비회원</Nav.Link>
        </Nav.Item>
      </Nav>
      <Modal.Body>
        {isMember?
        //회원
        <Form onSubmit={handleSubmit(onValid)}>
          <Form.Group className="mb-3" controlId="formLoginId">
            <Form.Label>이메일</Form.Label>
              <Form.Control {...register("email", {required:"값이 필요합니다."})} type="email" placeholder="이메일" />
              {errors?.email? (<Badge bg="secondary">{`${errors?.email?.message}`}</Badge>):null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control {...register("password", {required:"값이 필요합니다."})} type="password" placeholder="비밀번호" />
              {errors?.password? (<Badge bg="secondary">{`${errors?.password?.message}`}</Badge>):null}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={disabled}>
            로그인
          </Button>
              {errors?.extraError? (<Badge bg="secondary">{`${errors?.extraError?.message}`}</Badge>):null}
        </Form>
        :
        //비회원
        <Form onSubmit={handleSubmit(onValid)}>
        <Form.Group className="mb-3" controlId="formLoginId">
          <Form.Label>전화번호</Form.Label>
          <PhoneNo82>
            +82
            <Form.Control {...register("phone_no", {required:"값이 필요합니다."})} type="tel" placeholder="전화번호" />
          </PhoneNo82>
            {errors?.phone_no? (<Badge bg="secondary">{`${errors?.phone_no?.message}`}</Badge>):null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control {...register("password", {required:"값이 필요합니다."})} type="password" placeholder="비밀번호" />
            {errors?.password? (<Badge bg="secondary">{`${errors?.password?.message}`}</Badge>):null}
        </Form.Group>
        
        <Button variant="primary" type="submit" disabled={disabled}>
          로그인
        </Button>
            {errors?.extraError? (<Badge bg="secondary">{`${errors?.extraError?.message}`}</Badge>):null}
      </Form>}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-2">
          <Button variant="outline-dark">
            <svg id="twitter" viewBox="0 0 16 16" width="16px" height="16px">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
            </svg>
            Sign up with Twitter
          </Button>
          <Button variant="outline-primary">
            <svg id="facebook" viewBox="0 0 16 16" width="16px" height="16px" fill="#0d6efd">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
            </svg>    
            Sign up with Facebook
          </Button>
          <Button variant="outline-secondary">
              <svg id="github" viewBox="0 0 16 16" width="16px" height="16px" fill="#6c757d">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            Sign up with GitHub
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginForm;