import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const Spacer = styled.div`
height:56px;
`;

function Staff(){
    return (
        <>
            <Header />
            <Spacer/>
            <Routes>
            </Routes>
        </>
    )
}
export default Staff;