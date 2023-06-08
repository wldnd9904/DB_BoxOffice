import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import IMovie from '../../interfaces/Movie';
import ISchedule from '../../interfaces/Schedule';
import { IPeopleSelected } from '../../interfaces/Ticket';
import { selectedMovieAtom, selectedScheduleAtom, selectedPeopleAtom, customerAtom } from '../../utils/recoilAtoms';
import ICustomer from '../../interfaces/Customer';
import { ISeatInfo } from '../../interfaces/Payment';
const PriceCardContainer = styled.div`
  display: flex;
  width:100%;
  max-width: 550px;
  height:auto;
  padding:10px 30px;
  background-color:gray;
  border:1px solid gray;
  border-radius:30px;
  flex-direction: column;
  margin:20px;
`;
const Title = styled.div`
    display:flex;
    justify-content: space-between;
    margin-top:10px;
    color:lightgray;
    flex-direction: row;
`;
const SubTitle = styled.div`
    display:flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom:10px;
    color:white;
    flex-direction: row;
`;
const TitleLabel = styled.div`
    display:flex;
    font-size:1.5em;
    font-weight:bold;
`;
const Delimeter = styled.div`
    margin-top:10px;
    border:1px solid lightgray;
`;
interface PriceCardParams {
    seatInfo:ISeatInfo[];
    selectedPeople:IPeopleSelected;
}
function PriceCard(params:PriceCardParams) {
    const userData = useRecoilValue<ICustomer>(customerAtom);
    return (
        <PriceCardContainer>
            {params.seatInfo.length>0?
                params.seatInfo.map(info=>
                <Title key={info.seat}>
                    <TitleLabel>{info.seat} {info.count}석</TitleLabel>
                    <TitleLabel>{(info.price * info.count).toLocaleString()}원</TitleLabel>
                 </Title>)
            :null}
            {params.selectedPeople.adult>0? 
            <Title>
               <TitleLabel>일반 {params.selectedPeople.adult}명</TitleLabel>
               <TitleLabel>-</TitleLabel>
            </Title>
            :null}
            {params.selectedPeople.teen>0? 
            <Title>
               <TitleLabel>청소년 {params.selectedPeople.teen}명</TitleLabel>
               <TitleLabel>-{(params.selectedPeople.teen*2000).toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            {params.selectedPeople.senior>0? 
            <Title>
               <TitleLabel>경로 {params.selectedPeople.senior}명</TitleLabel>
               <TitleLabel>-{(params.selectedPeople.senior*2000).toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            {params.selectedPeople.disabled>0? 
            <Title>
               <TitleLabel>우대 {params.selectedPeople.disabled}명</TitleLabel>
               <TitleLabel>-{(params.selectedPeople.disabled*2000).toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            <Delimeter />
            <SubTitle>
                <TitleLabel>금액</TitleLabel>
                <TitleLabel>{(params.seatInfo.reduce((currentValue,seat)=>currentValue+seat.price*seat.count,0)-(params.selectedPeople.teen+params.selectedPeople.senior+params.selectedPeople.disabled)*2000).toLocaleString()}원</TitleLabel>
            </SubTitle>
        </PriceCardContainer>
  )
}
export default PriceCard;