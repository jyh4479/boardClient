import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {CreateContent, Home, Login} from "./container";
import PrivateRoute from "./util/PrivateRoute";
import {Fragment} from "react";
import{Navbar, Container, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {
    return (
        <Router>
            <Fragment>

                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">KOLON 게시판</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

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
