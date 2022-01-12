import React from 'react'

const LoginPage = props => {
    return (
        <div>
            <div>게시판 로그인</div>
            <div><input placeholder={"id"}></input></div>
            <div><input placeholder={"password"}></input></div>
            <button>로그인</button>
        </div>
    )
}

export default LoginPage