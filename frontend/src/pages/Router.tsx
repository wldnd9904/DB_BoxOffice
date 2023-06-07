import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Client from "./Customer/Customer";
import Staff from "./Staff/Staff";
import styled from "styled-components";
import { BASE_URL } from "../utils/api/api";
const PrettyButtonContainer = styled.div`
    display:flex;
    width:100%;
    height:50%;
    flex-direction: row;
    align-items: center;
`;
const PrettyButton = styled.div`   
    width:300px;
    height:300px;
    display:flex;
    background-color: pink;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin:30px;
    font-family: sans-serif;
    color:white;
    font-size:5em;
    transition: all 0.1s linear;
    :hover {
        transform: scale(1.03);
    }
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
function Router() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
        <Route path={`/`} element = {
        <PrettyButtonContainer>
            <Link to={`client/home`}><PrettyButton>Client</PrettyButton></Link>
            <Link to={`staff/home`}><PrettyButton>Staff</PrettyButton></Link>
            <a href={BASE_URL+"/swagger"}><PrettyButton>API</PrettyButton></a>
        </PrettyButtonContainer>
        }/>
        <Route path={`/client/*`} element={<Client/>}/>
        <Route path={`/staff/*`} element={<Staff/>}/>
    </Routes>
    </BrowserRouter>
}
export default Router;