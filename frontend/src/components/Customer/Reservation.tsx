import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import ICustomer from '../../interfaces/Customer';
import IMovie from '../../interfaces/Movie';
import ISchedule from '../../interfaces/Schedule';
import { IPeopleSelected } from '../../interfaces/Ticket';
import { customerAtom, selectedMovieAtom, selectedScheduleAtom, selectedPeopleAtom } from '../../utils/recoilAtoms';
import { YYYYMMDD, HHMM } from '../../utils/timeFormatter';
import Grade from '../atoms/Grade';
import PriceCard from '../atoms/PriceCard';
import IPayment from '../../interfaces/Payment';
import ReservationCard from '../atoms/ReservationCard';
import { demoPayment } from '../../utils/demos';
const ReservationContainer = styled.div`
  display: flex;
  margin: 70px auto;
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
    const [reservations, setReservations] = useState<IPayment[]>([demoPayment]);
    return (
        <ReservationContainer>
            <Title>총 {reservations.length}건</Title>
            {
                reservations.map((reservation, idx) => (
                    <ReservationCard key={idx} {...reservation}/>
                ))
            }
        </ReservationContainer>
  )
}
export default Reservation;