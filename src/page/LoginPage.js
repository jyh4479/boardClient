import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Card, FormControl, FormGroup, FormLabel} from 'react-bootstrap'
import {MemberServiceApi} from "../util/ApiService";
import '../style/LoginPage.scss'

const LoginPage = props => {

    let navigate = useNavigate()
    let getId = React.createRef()
    let getPassword = React.createRef()

    const loginWork = new CustomEvent('login')
    const loginCancel = new CustomEvent('loginCancel')

    useEffect(() => {
        localStorage.clear()
        dispatchEvent(loginCancel)
    }, [])

    const login = async (e) => {
        const id = getId.current.value
        const password = getPassword.current.value
        let result

        try {
            result = await MemberServiceApi.getLoginToken(id, password)
            if (result) {
                localStorage.setItem("user-id", id)
                window.dispatchEvent(loginWork)
                navigate('/')
            }
        } catch (e) {
            console.log('Error Catch in Login')
        }
    }

    return (
        <Card className={'loginCard'}>
            <Card.Header>게시판 로그인</Card.Header>
            <Card.Body>
                <FormGroup onSubmit={login}>
                    <FormLabel>아이디</FormLabel>
                    <FormControl ref={getId} name={'id'} placeholder={'id'}/>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl ref={getPassword} name={'password'} type={'password'} placeholder={'password'}/>
                </FormGroup>
            </Card.Body>
            <Card.Body>
                <Button type={'submit'} onClick={login}>로그인</Button>
            </Card.Body>
        </Card>
    )
}

export default LoginPage