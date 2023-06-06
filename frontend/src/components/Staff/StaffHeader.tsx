import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { customerAtom, customerGradeNameAtom } from '../../utils/recoilAtoms';
import { Offcanvas } from 'react-bootstrap';
import CodeManager from '../../utils/CodeManager';
import LoginForm from '../Customer/LoginForm';
import MyPage from '../Customer/MyPage';
import RegisterForm from '../Customer/RegisterForm';
import { getCookie, removeCookie } from '../../utils/api/cookie';
import CustomerManager from '../../utils/CustomerManager';

function StaffHeader() {
  const [userData, setUserData] = useRecoilState(customerAtom);
  const [customerGradeName, setCustomerGradeName] = useRecoilState(customerGradeNameAtom);
  const resetUserData = useResetRecoilState(customerAtom);
  const [modalType, setModalType] = useState("R");
  const [navShow, setNavShow] = useState(false);
  const handleNavClose = () => setNavShow(false);
  const handleNavShow = () => setNavShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const register = () => {
    setShow(true);
    setNavShow(false);
    setModalType("R");
  };
  const login = () => {
    setShow(true);
    setNavShow(false);
    setModalType("L");
  };
  const logout = async () => {
    await CustomerManager.logout();
    removeCookie("jwt", {path:'/'});
    resetUserData();
  };
  const myPage = () => {
    setShow(true);
    setNavShow(false);
    setModalType("M");
  };
useEffect(()=>{
  (async()=>{
      if(!userData&&getCookie("jwt")){
        let userData = await CustomerManager.sessionLogin();
        console.log(userData);
        if(userData!=undefined) setUserData(userData);
      }})();
},[userData]);
  return (
  <>
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="home">서울씨네마 관리자페이지</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={handleNavShow} />
        <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} aria-labelledby={`offcanvasNavbarLabel-expand-md`} placement="end" show={navShow} onHide={handleNavClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                {userData?`${userData?.cus_nm}님`:"로그인 해주세요."}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" onClick={()=>setNavShow(false)}>
              {userData?
            <><Nav.Link onClick={myPage}>내 정보</Nav.Link>
              <Nav.Link onClick={logout}>로그아웃</Nav.Link></>:
            <><Nav.Link onClick={register}>회원가입</Nav.Link>
              <Nav.Link onClick={login}>로그인</Nav.Link></>}
              <Nav.Link as={Link} to={'user'}>사용자</Nav.Link>
              <Nav.Link as={Link} to={'movie'}>영화</Nav.Link>
              <Nav.Link as={Link} to={'theater'}>상영관</Nav.Link>
              <Nav.Link as={Link} to={'schedule'}>상영일정</Nav.Link>
              <Nav.Link as={Link} to={'payment'}>결제</Nav.Link>
              <Nav.Link as={Link} to={'code'}>코드</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    {
      {
        "R":<RegisterForm show={show} handleClose={handleClose} />,
        "L":<LoginForm show={show} handleClose={handleClose} />,
        "M":<MyPage show={show} handleClose={handleClose} />,
      }[modalType]
    }
  </>
  );
}

export default StaffHeader;

