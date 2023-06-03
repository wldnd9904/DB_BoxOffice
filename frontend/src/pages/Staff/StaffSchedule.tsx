import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { customerAtom } from "../../utils/recoilAtoms";
import { useRecoilValue } from "recoil";
import { demo } from "../../utils/api/api";
import StaffScheduleList from "../../components/Staff/StaffScheduleList";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffSchedule(){
    const userData = useRecoilValue(customerAtom);
    return (<>
        <HelmetProvider>
            <Helmet>
                <title>상영일정 관리</title>
            </Helmet>
        </HelmetProvider>
        <Container>
            {true||demo||(userData?.cus_grade_no==10)?
            <StaffScheduleList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffSchedule;