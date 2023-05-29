import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
const PriceCardContainer = styled.div`
  display: flex;
  
  border:1px solid darkblue;
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

interface PriceCardParams {
    label:string;
    price:number;
    multiply:number;
}
function PriceCard(params:PriceCardParams) {
    return (
        <PriceCardContainer>
        </PriceCardContainer>
  )
}
export default PriceCard;