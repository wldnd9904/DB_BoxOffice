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
const PayContainer = styled.div`
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
interface PayParams {
  onSelect: () => void;
}
function Pay(params:PayParams) {
    const userData = useRecoilValue<ICustomer>(customerAtom);
    const selectedMovie = useRecoilValue<IMovie>(selectedMovieAtom);
    const selectedSchedule = useRecoilValue<ISchedule>(selectedScheduleAtom);
    const selectedPeople = useRecoilValue<IPeopleSelected>(selectedPeopleAtom);
    const isPointUsed = useState<Boolean>(false)
    const complete = () => {
        alert("결제되었습니다.");
    }
    return (
        <PayContainer>
            <Title><Grade grade={selectedMovie.mov_grade_no} />{selectedMovie.mov_nm} - {selectedSchedule.run_type}</Title>
            <ScheduleTitle>{`${"2층 1관"} ${YYYYMMDD(selectedSchedule.run_date)} ${HHMM(selectedSchedule.run_date)}~${HHMM(selectedSchedule.run_end_date)}`}</ScheduleTitle>
            <ScheduleTitle>{selectedPeople.detail}</ScheduleTitle>
            <PriceCard/>
            <Form>
                <FormGroup>
                <ScheduleTitle>결제방법선택</ScheduleTitle>
                    {['신용/체크카드','휴대폰 결제','간편결제','내통장결제'].map((label,idx) => 
                    <Form.Check
                        inline
                        type={'radio'}
                        id={`${idx}`}
                        label={label} />
                    )}
                </FormGroup>
                <FormGroup>
                <ScheduleTitle>포인트
                    {userData?<Check type="switch" checked={true}/>:null}
                </ScheduleTitle>
                    <Form.Control disabled={userData?false:true} type="number" placeholder={userData?"0":"로그인 시 사용 가능합니다."}/>
                    {userData?<Form.Text>
                        <Check inline label={'포인트 전체(3000)사용'} />
                    </Form.Text>:null}
                </FormGroup>
            </Form>
            <ButtonContainer>
                <Button onClick={complete} variant="danger">예매취소</Button>
                <Button onClick={complete}>결제</Button>
            </ButtonContainer>
        </PayContainer>
  )
}
export default Pay;