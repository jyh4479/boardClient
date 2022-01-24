import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CreateContent, Detail, Home, Login} from "./container";
import {GlobalNavigationBar} from "./component";
import PrivateRoute from "./util/PrivateRoute";
import {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {
    return (
        <Router>
            <Fragment>
                <GlobalNavigationBar/>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>

                    <Route path={"/"} element={<PrivateRoute/>}>
                        <Route path={"/"} element={<Home/>}/>
                    </Route>

                    <Route path={"/contentform"} element={<PrivateRoute/>}>
                        <Route path={"/contentform"} element={<CreateContent/>}/>
                    </Route>

                    <Route path={"/detail/:pageId"} element={<PrivateRoute/>}>
                        <Route path={"/detail/:pageId"} element={<Detail/>}/>
                    </Route>
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
