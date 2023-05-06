import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Client from "./Client/Client";
import Staff from "./Staff";

function Router() {
    console.log(process.env.PUBLIC_URL)
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Link to={`client/home`}>client</Link>
    <Link to={`staff/home`}>staff</Link>
    <Routes>
        <Route path={`/client/*`} element={<Client/>}/>
        <Route path={`/staff/*`} element={<Staff/>}/>
    </Routes>
    </BrowserRouter>
}
export default Router;