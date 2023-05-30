import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import IMovie from '../../interfaces/Movie';
import ISchedule from '../../interfaces/Schedule';
import { IPeopleSelected } from '../../interfaces/Ticket';
import { selectedMovieAtom, selectedScheduleAtom, selectedPeopleAtom, customerAtom } from '../../utils/recoilAtoms';
import ICustomer from '../../interfaces/Customer';
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
function PriceCard() {
    const userData = useRecoilValue<ICustomer>(customerAtom);
    const selectedPeople = useRecoilValue<IPeopleSelected>(selectedPeopleAtom);
    const adultPrice = selectedPeople.adult?selectedPeople.adult*14000:0;
    const teenPrice = selectedPeople.teen?selectedPeople.teen*14000:0;
    const seniorPrice = selectedPeople.senior?selectedPeople.senior*14000:0;
    const disabledPrice = selectedPeople.disabled?selectedPeople.disabled*14000:0;
    return (
        <PriceCardContainer>
            {selectedPeople.adult>0? 
            <Title>
               <TitleLabel>성인 {selectedPeople.adult}명</TitleLabel>
                <TitleLabel>{adultPrice.toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            {selectedPeople.teen>0? 
            <Title>
               <TitleLabel>청소년 {selectedPeople.teen}명</TitleLabel>
                <TitleLabel>{teenPrice.toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            {selectedPeople.senior>0? 
            <Title>
               <TitleLabel>경로 {selectedPeople.senior}명</TitleLabel>
                <TitleLabel>{seniorPrice.toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            {selectedPeople.disabled>0? 
            <Title>
               <TitleLabel>우대 {selectedPeople.disabled}명</TitleLabel>
                <TitleLabel>{disabledPrice.toLocaleString()}원</TitleLabel>
            </Title>
            :null}
            <Delimeter />
            <SubTitle>
                <TitleLabel>금액</TitleLabel>
                <TitleLabel>{(adultPrice+teenPrice+seniorPrice+disabledPrice).toLocaleString()}원</TitleLabel>
            </SubTitle>
        </PriceCardContainer>
  )
}
export default PriceCard;