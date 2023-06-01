import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import Ticket from "./Ticket";
import Header from "../../components/Customer/Header";
import BookingList from "./BookingList";

const Spacer = styled.div`
height:56px;
`;

function Customer(){
    return (
        <>
            <Header />
            <Spacer/>
            <Routes>
                <Route path={`/home`} element={<Home/>}/>
                <Route path={`/ticket`} element={<Ticket/>}/>
                <Route path={`/bookinglist`} element={<BookingList/>}/>
            </Routes>
        </>
    )
}
export default Customer;