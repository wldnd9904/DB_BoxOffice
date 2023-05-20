import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import CarouselView from "../../components/CarouselView";

const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

function StaffHome(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>서울씨네마 직원페이지!</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <CarouselView />
        </MainContainer>
        </>
    );
}
export default StaffHome;