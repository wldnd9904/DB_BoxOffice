import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { customerAtom } from "../../utils/recoilAtoms";
import { useRecoilValue } from "recoil";
import StaffMovieList from "../../components/Staff/StaffMovieList";
import { demo } from "../../utils/api/api";
import StaffCodeList from "../../components/Staff/StaffCodeList";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffCode(){
    const userData = useRecoilValue(customerAtom);
    return (<>
        <HelmetProvider>
            <Helmet>
                <title>코드 관리</title>
            </Helmet>
        </HelmetProvider>
        <Container>
            {demo||(userData?.cus_grade_no=="CD00300")?
            <StaffCodeList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffCode;