import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import IMovie from '../interfaces/Movie';
import ISchedule from '../interfaces/Schedule';
import { IPeopleSelected } from '../interfaces/Ticket';
import { selectedMovieAtom, selectedScheduleAtom, selectedPeopleAtom } from '../utils/recoilAtoms';
import Grade from './atoms/Grade';
import { HHMM, YYYYMMDD } from '../utils/timeFormatter';
import PriceCard from './atoms/PriceCard';
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
`;
const Receipt = styled.div`
    display:flex;
    width: 400px;
    height: 200px;
    border-radius: 10px;
    border:1px solid gray;
    margin:10px;
    padding:10px;
`;
interface PayParams {
  onSelect: () => void;
}
function Pay(params:PayParams) {
    const selectedMovie = useRecoilValue<IMovie>(selectedMovieAtom);
    const selectedSchedule = useRecoilValue<ISchedule>(selectedScheduleAtom);
    const selectedPeople = useRecoilValue<IPeopleSelected>(selectedPeopleAtom);
    return (
        <PayContainer>
            <Title><Grade grade={selectedMovie.mov_grade_no} />{selectedMovie.mov_nm} - {selectedSchedule.run_type}</Title>
            <ScheduleTitle>{`${"2층 1관"} ${YYYYMMDD(selectedSchedule.run_date)} ${HHMM(selectedSchedule.run_date)}~${HHMM(selectedSchedule.run_end_date)}`}</ScheduleTitle>
            <PriceCard label={'성인'} price={15000} multiply={selectedPeople.adult} />
        </PayContainer>
  )
}
export default Pay;