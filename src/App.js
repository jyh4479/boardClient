import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home, Login} from "./container";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                {/*<Route/>*/}
                {/*<Route/>*/}
            </Routes>
        </Router>
    );
}

export default App;
