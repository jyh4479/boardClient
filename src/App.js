import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CreateContent, Home, Login} from "./container";
import PrivateRoute from "./util/PrivateRoute";
import {Fragment} from "react";

const App = () => {
    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>

                    <Route path={"/"} element={<PrivateRoute/>}>
                        <Route path={"/"} element={<Home/>}/>
                    </Route>

                    <Route path={"/contentform"} element={<PrivateRoute/>}>
                        <Route path={"/contentform"} element={<CreateContent/>}/>
                    </Route>

                    {/*<Route/>*/}
                    {/*<Route/>*/}
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
