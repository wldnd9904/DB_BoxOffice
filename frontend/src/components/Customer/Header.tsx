import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import MyPage from './MyPage';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Offcanvas } from 'react-bootstrap';
import CodeManager from '../../utils/CodeManager';
import { customerAtom, customerGradeNameAtom } from '../../utils/recoilAtoms';

function Header() {
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
  const logout = () => {
    resetUserData();
  };
  const myPage = () => {
    setShow(true);
    setNavShow(false);
    setModalType("M");
  };
  useEffect(()=>{
    (async()=>{
        setCustomerGradeName(await CodeManager.getCustomerGradeData()); 
    })();
  },[]);
  return (
  <>
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="home">서울씨네마</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={handleNavShow} />
        <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} aria-labelledby={`offcanvasNavbarLabel-expand-md`} placement="end" show={navShow} onHide={handleNavClose}>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" onClick={()=>setNavShow(false)}>
              {userData?
            <><Nav.Link onClick={myPage}> {customerGradeName[userData?.cus_grade_no].cus_grade_nm} {userData?.cus_nm}님 </Nav.Link>
              <Nav.Link onClick={myPage}>내 정보</Nav.Link>
              <Nav.Link onClick={logout}>로그아웃</Nav.Link></>:
            <><Nav.Link onClick={register}>회원가입</Nav.Link>
              <Nav.Link onClick={login}>로그인</Nav.Link></>}
              <Nav.Link as={Link} to={'ticket'}>예매하기</Nav.Link>
              <Nav.Link as={Link} to={'bookinglist'}>예매 내역</Nav.Link>
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

export default Header;

