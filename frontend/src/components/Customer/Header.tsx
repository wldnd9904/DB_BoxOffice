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
import { customerAtom, customerGradeNameAtom, payMethodNameAtom, reservationsAtom } from '../../utils/recoilAtoms';
import CustomerManager from '../../utils/CustomerManager';
import { getCookie, removeCookie } from '../../utils/api/cookie';
import IPayment, { IReceipt } from '../../interfaces/Payment';
import { ICode, ICustomerGrade, IPayMethod } from '../../interfaces/Codes';
import PaymentManager from '../../utils/PaymentManager';
import styled from 'styled-components';

const PinWrapper = styled.div`
  display:flex;
  flex-direction: row;
`;
const Pin = styled.div<{status:boolean}>`
  display:flex;
  width:8px;
  height:8px;
  margin:1px;
  border-radius:4px;
  background-color: tomato;
  opacity:${props=>props.status?1:0};
`;

function Header() {
  const [userData, setUserData] = useRecoilState(customerAtom);
  const [customerGradeName, setCustomerGradeName] = useRecoilState<ICustomerGrade>(customerGradeNameAtom);
  const [payMethodName, setPayMethodName] = useRecoilState<IPayMethod>(payMethodNameAtom);
  const [reservations, setReservations] = useRecoilState<IReceipt[]>(reservationsAtom);
  const resetUserData = useResetRecoilState(customerAtom);
  const resetReservData = useResetRecoilState(reservationsAtom);
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
    resetReservData();
  };
  const myPage = () => {
    setShow(true);
    setNavShow(false);
    setModalType("M");
  };
  const pinStatus = () => {
    if(reservations.length>0) return reservations.filter((payment)=>!(payment.pay_state)).length>0
    else return false;
  }
  useEffect(()=>{
    (async()=>{
        if(!userData&&getCookie("jwt")){
          let userData = await CustomerManager.sessionLogin();
          console.log(userData);
          if(userData!=undefined) setUserData(userData);
        }
        if(userData)setReservations(await PaymentManager.getPaymentListData());
        if(!customerGradeName)setCustomerGradeName(await CodeManager.getCustomerGradeData());
        if(!payMethodName)setPayMethodName(await CodeManager.getPayMethodData());
    })();
  },[userData]);
  return (
  <>
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="home">서울씨네마</Navbar.Brand>
        <PinWrapper>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} onClick={handleNavShow} />
        </PinWrapper>
        <Navbar.Offcanvas id={`offcanvasNavbar-expand-md`} aria-labelledby={`offcanvasNavbarLabel-expand-md`} placement="end" show={navShow} onHide={handleNavClose}>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" onClick={()=>setNavShow(false)}>
              {userData&&customerGradeName?
            <><Nav.Link onClick={myPage}> {customerGradeName[userData?.cus_grade_no].cus_grade_nm} {userData?.cus_nm}님 </Nav.Link>
              <Nav.Link onClick={myPage}>내 정보</Nav.Link>
              <Nav.Link onClick={logout}>로그아웃</Nav.Link></>:
            <><Nav.Link onClick={register}>회원가입</Nav.Link>
              <Nav.Link onClick={login}>로그인</Nav.Link></>}
              <Nav.Link as={Link} to={'ticket'}>예매하기</Nav.Link>
              <Nav.Link as={Link} to={'bookinglist'}>
                <PinWrapper>
                  예매 내역 <Pin status={pinStatus()} />
                </PinWrapper>
                </Nav.Link>
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

