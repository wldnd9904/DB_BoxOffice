import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Client from "./Customer/Customer";
import Staff from "./Staff/Staff";

function Router() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
        <Route path={`/`} element = {
        <>
            <Link to={`client/home`}>client</Link>
            <Link to={`staff/home`}>staff</Link>
        </>
        }/>
        <Route path={`/client/*`} element={<Client/>}/>
        <Route path={`/staff/*`} element={<Staff/>}/>
    </Routes>
    </BrowserRouter>
}
export default Router;