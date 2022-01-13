import React from 'react'
import {useNavigate} from 'react-router-dom'
import {MemberServiceApi} from "../util/ApiService";

const LoginPage = props => {

    let navigate = useNavigate()
    let getId = React.createRef()
    let getPassword = React.createRef()

    const login = async (e) => {
        const id = getId.current.value
        const password = getPassword.current.value
        let result

        try {
            result = await MemberServiceApi.getLoginToken(id, password)
            if (result) {
                localStorage.setItem("user-id", id)
                navigate('/')
            }
        } catch (e) {
            console.log('Error Catch in Login')
        }
    }

    return (
        <div>
            <div>게시판 로그인</div>
            <form onSubmit={login}>
                <div><input ref={getId} name={'id'} placeholder={'id'}></input></div>
                <div><input ref={getPassword} name={'password'} type={'password'} placeholder={'password'}></input>
                </div>
            </form>
            <button type={'submit'} onClick={login}>로그인</button>
        </div>
    )
}

export default LoginPage