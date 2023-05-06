import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";
import Home from "./Home";

const Spacer = styled.div`
height:56px;
`;

function Client(){
    return (
        <>
            <Header />
            <Spacer/>
            <Routes>
                <Route path={`/home`} element={<Home/>}/>
            </Routes>
        </>
    )
}
export default Client;