import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

const CarouselItem = styled(Carousel.Item)<{show:boolean}>`
  display:flex;
  justify-content: center;
  align-items: center;
  video {
    z-index:${props=>props.show?1:-1};
    width:100%;
    height:100%;
  }
`;

function CarouselView() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex:number, e:any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <CarouselItem show={`${index==0}`}>
          <video autoPlay muted>
            <source src="https://adimg.cgv.co.kr/images/202305/Transformers7/0601_TF7_1080x608.mp4" type="video/mp4" />
            이 브라우저는 Video 태그를 지원하지 않습니다. (Your browser does not support the video tag.)
          </video>
        <Carousel.Caption>
          <h3>트랜스포머: 비스트의 서막</h3>
          <p>★6월 6일, 전세계 최초 개봉★</p>
        </Carousel.Caption>
      </CarouselItem>

      {/*<CarouselItem show={`${index==1}`}>
        <video autoPlay muted>
            <source src="http://h.vod.cgv.co.kr:80/vodCGVa/87045/87045_214957_1200_128_960_540.mp4" type="video/mp4" />
            이 브라우저는 Video 태그를 지원하지 않습니다. (Your browser does not support the video tag.)
          </video>
        <Carousel.Caption>
          <h3>범죄도시 3</h3>
          <p>나쁜 놈들 잡는 데 이유 없고 제한 없다. 커진 판도 시원하게 싹 쓸어버린다!</p>
        </Carousel.Caption>
  </CarouselItem>*/}

    </Carousel>
  );
}
export default CarouselView;