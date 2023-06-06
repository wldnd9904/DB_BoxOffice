import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { customerAtom } from "../../utils/recoilAtoms";
import { useRecoilValue } from "recoil";
import StaffTheaterList from "../../components/Staff/StaffTheaterList";
import { demo } from "../../utils/api/api";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffTheater(){
    const userData = useRecoilValue(customerAtom);
    return (<>
        <HelmetProvider>
            <Helmet>
                <title>상영관 관리</title>
            </Helmet>
        </HelmetProvider>
        <Container>
            {true||demo||(userData?.cus_grade_no=="CD00300")?
           <StaffTheaterList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffTheater;