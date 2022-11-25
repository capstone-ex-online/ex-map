import React from 'react'
import GlobalStyle from '../components/GlobalStyle';
import Login from '../components/Login'

const LoginPage = ({...hookProps}) => {
    return (
        <div>
            <GlobalStyle />
            <Login {...hookProps} />
        </div>
    )
}

export default LoginPage;