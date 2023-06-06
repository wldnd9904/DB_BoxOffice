import Pagination from 'react-bootstrap/Pagination';
import styled from 'styled-components';

const NumSelectorContainer = styled.div`
  display: flex;
  margin: 4px;
  flex-direction: row;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin:5px;
`;

interface NumSelectorParams {
    label:string;
    limit:number;
    current:number;
    left:number;
    onSelect:(item:number)=>void;
}

function NumSelector(params: NumSelectorParams) {
    const items:number[] = Array.from(Array(params.limit+1).keys()).map(v=>v);
  return (
    <NumSelectorContainer>
        <Title>{params.label}:</Title>
    <Pagination>
      {items.map((item, idx) => 
        <Pagination.Item 
            onClick={()=>params.onSelect(item)}
            key={idx}
            active={params.current==item}
            disabled={params.left+params.current<item}>
            {item}
        </Pagination.Item>
        )}
    </Pagination>
    </NumSelectorContainer>
  );
}

export default NumSelector;