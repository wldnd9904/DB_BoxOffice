import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import ICustomer from '../../interfaces/Customer';
import { customerAtom, reservationsAtom } from '../../utils/recoilAtoms';

import IPayment, { IReceipt } from '../../interfaces/Payment';
import ReservationCard from '../atoms/ReservationCard';
import { Modal } from 'react-bootstrap';
import Pay from './Pay';
import { useState } from 'react';
const ReservationContainer = styled.div`
  display: flex;
  margin: 0px auto;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
    display:flex;
    font-size:1.5em;
    font-weight:bold;
    margin:5px auto;
    div {
        margin-right:5px;
    }
`;
const ScheduleTitle = styled.div`
    display:flex;
    font-size:1.2em;
    font-weight:bold;
    margin-bottom:5px;
    align-items: center;
`;
const FormGroup = styled(Form.Group)`
    margin-top:10px;
`;
const Check = styled(Form.Check)`
    text-align:center;
    input {
        position:relative;
        top:-3px;
    }
`;
const ButtonContainer = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: row;
    button{
        margin:2px;
    }
`;
function Reservation() {
    const userData = useRecoilValue<ICustomer>(customerAtom);
    const [reservations, setReservations] = useRecoilState<IReceipt[]>(reservationsAtom);
    return (
        <ReservationContainer>
            <Title>예매 내역</Title>
            <Title>총 {reservations.length}건</Title>
            {reservations.length>0?
                reservations.map((reservation, idx) => (
                    <ReservationCard key={idx} receipt={reservation}/>
                ))
            :null}
        </ReservationContainer>
    )
}
export default Reservation;