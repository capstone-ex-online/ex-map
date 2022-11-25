import styled from 'styled-components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #EDCB98;
    position: relative;
    overflow: hidden;
`;

const Rectangle1 = styled.div`
    position: absolute;
    width: 1440px;
    height: 1083px;
    left: -425px;
    top: 437px;
    border-radius: 50% / 50%;
    background: #BA9F77;
`;

const Rectangle2 = styled.div`
    position: absolute;
    width: 1440px;
    height: 843px;
    left: 720px;
    top: 564px;
    border-radius: 50% / 50%;
    background: #BA9F77;
`;

const FormContainer = styled.div`
    position: absolute;
    width: 959px;
    height: 632px;
    background-color: #ffffff;
    box-shadow: 8px 8px 4px rgba(0,0,0,0.25);
    border-radius: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login-form__logo {
        width: 440px;
        height: 30px;
        position: absolute;
        top: 82px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        .login-form__logo-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 75px;
        }
    }
    .login-form__input {
        width: 500px;
        height: 640px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .login-form__input-id {
            padding-left: 15px;
            width: 453px;
            height: 63px;
            position: absolute;
            top: 254px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #E9E9E9;

            color: #707070;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;
        }
        .login-form__input-id:focus {
            outline: none;
        }
        .login-form__input-pwd {
            padding-left: 15px;
            width: 453px;
            height: 63px;
            position: absolute;
            top: 348px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #E9E9E9;

            color: #707070;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;
        }
        .login-form__input-pwd:focus {
            outline: none;
        }
        .login-form__submit-button {
            width: 468px;
            height: 63px;
            position: absolute;
            top: 483px;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #EDCB98;
            border-radius: 50px;
            border: none;

            color: #ffffff;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;

            text-align: center;
        }
    }
    .login-form__other {
        width: 468px;
        height: 63px;
        font-size: 25px;
        font-weight: 400;
        position: absolute;
        top: 508px;
        left: 50%;
        transform: translateX(-50%);
        color: #707070;
        .login-form__id-pwd-find {
            position: absolute;
            top: 18px;
            left: 142px;
            cursor: pointer;
        }
    }
`;

function Login({ setLoginId, setLoginState, setLoginName }) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    // const [loginStatus, setLoginStatus] = useState('')

    const navigate = useNavigate()

    const login = () => {
        if(id === "" || password === ""){
            window.alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        Axios.post(
            'http://localhost:5000/api/login', 
            {
                id: id,
                password: password,
            }).then((response) => {
                // if (response.data.message) {
                //     setLoginStatus(response.data.message)
                // } else {
                //     setLoginStatus(response.data[0])
                // }
                console.log(response)
                if(response.data.success) {
                    setLoginId(response.data.loginId)
                    setLoginState(response.data.loginState)
                    setLoginName(response.data.loginName)
                    navigate('/')
                }
        })
    }

    return (
        <LoginContainer>
            <Rectangle1/>
            <Rectangle2/>
            <FormContainer>
                <div className="login-form__logo">
                    <div className="login-form__logo-text">Log In</div>
                </div>
                <div className="login-form__input">
                    <input 
                        type="text" 
                        name="id" 
                        placeholder="ID" 
                        className="login-form__input-id"
                        onChange={(e) => {
                            setId(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="password" 
                        name="pwd" 
                        placeholder="Password" 
                        className="login-form__input-pwd"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}>
                    </input>
                    <button 
                        type="submit" 
                        className="login-form__submit-button"
                        onClick={login}>
                        Log In
                    </button>
                </div>
                <div className="login-form__other">
                    <div className="login-form__id-pwd-find">Forgot password?</div>
                </div>
            </FormContainer>
        </LoginContainer>
    )
}

export default Login