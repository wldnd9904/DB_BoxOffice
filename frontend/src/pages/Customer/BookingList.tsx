import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import CarouselView from "../../components/Customer/CarouselView";
import Reservation from "../../components/Customer/Reservation";

const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

function BookingList(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>예매 내역</title>
                </Helmet>
            </HelmetProvider>
        <MainContainer>
            <Reservation />
        </MainContainer>
        </>
    );
}
export default BookingList;