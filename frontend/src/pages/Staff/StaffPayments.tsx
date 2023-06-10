import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useRecoilValue } from "recoil";
import { customerAtom } from "../../utils/recoilAtoms";
import UserList from "../../components/Staff/StaffUserList";
import { demo } from "../../utils/api/api";
import StaffpaymentList from "../../components/Staff/StaffPaymentList";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffPayment(){
    const userData = useRecoilValue(customerAtom);
    return (<>
        <HelmetProvider>
            <Helmet>
                <title>결제 관리</title>
            </Helmet>
        </HelmetProvider>
        <Container>
            {true||demo||(userData?.cus_grade_no=="CD00300")?
            <StaffpaymentList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffPayment;