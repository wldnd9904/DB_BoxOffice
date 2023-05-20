import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import StaffHome from "./StaffHome";
import StaffHeader from "../../components/Staff/StaffHeader";
import StaffUser from "./StaffUser";

const Spacer = styled.div`
height:56px;
`;

function Staff(){
    return (
        <>
            <StaffHeader />
            <Spacer/>
            <Routes>
                <Route path={`/home`} element={<StaffHome/>}/>
                <Route path={`/user`} element={<StaffUser/>}/>
            </Routes>
        </>
    )
}
export default Staff;