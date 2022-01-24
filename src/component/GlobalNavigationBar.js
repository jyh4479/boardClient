import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Container, Nav, Navbar} from "react-bootstrap";

const GlobalNavigationBar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(localStorage.getItem('user-id'))

    useEffect(() => {
        window.removeEventListener('login', () => console.log("remove event"))
        window.addEventListener('login', () => {
            setUser(localStorage.getItem('user-id'))
        })

        window.removeEventListener('loginCancel', () => console.log("remove event"))
        window.addEventListener('loginCancel', () => {
            setUser(null)
        })
    }, [])

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>KOLON 게시판</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>

                <Nav>
                    {user ?
                        <>
                            <Nav.Link>{user}</Nav.Link>
                            <Nav.Link onClick={() => {
                                localStorage.clear()
                                navigate('/login')
                                setUser(null)
                            }}>로그아웃</Nav.Link>
                        </>
                        :
                        <Nav.Link onClick={() => navigate('/login')}>로그인</Nav.Link>
                    }
                </Nav>

            </Container>
        </Navbar>
    )
}
export default GlobalNavigationBar
