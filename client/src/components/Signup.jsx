import styled from 'styled-components'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
// import axios from 'axios';

const SignupContainer = styled.div`
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
    width: 959px;
    height: 763px;
    background-color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 8px 8px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;

    .signup-form__logo {
        width: 550px;
        height: 147px;
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        .signup-form__logo-text {
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 75px;
            line-height: 94px;
            text-align: center;
            
            color: #000000;

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    
    .signup-form__choose-type {

        label {
            padding: 20px;
        }

        [type="radio"],
        [type="radio"]:checked {
            position: absolute;
            appearance: none;
            top: 27px;
            right: 23px;
            width: 28px;
            height: 28px;
            background-color: #fff;
            border: 2px solid #e3e3e3;
            border-radius: 50%;
            outline:none;
        }

        [type="radio"]:checked {
            border: 3px solid #edcb98;
        }

        [type="radio"]:hover {
            cursor: pointer;
        }

        .form-check-user {
            position: relative;
            width: 453px;
            height: 90px;
            padding-left: 15px;
            position: absolute;
            top: 290px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            background-color: #e9e9e9;

            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 80px;
            color: #707070;
        }

        .form-check-docent {
            position: relative;
            width: 453px;
            height: 90px;
            padding-left: 15px;
            position: absolute;
            top: 440px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            background-color: #e9e9e9;

            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 80px;
            color: #707070;
        }

        .signup-form__submit-button {
            width: 468px;
            height: 63px;
            position: absolute;
            top: 640px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #edcb98;

            color: #ffffff;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;

            text-align: center;
        }
    }

    .signup-form__upload-file {
        .signup-form__big-rectangle{
            position: absolute;
            width: 719px;
            height: 377px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #e9e9e9;
            border: none;
            border-radius: 50px; 
            
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 26px;
            line-height:66px;
            text-align: center;

            color: #000000;
        }

        .signup-form__small-rectangle{
            position: absolute;
            width: 672px;
            height: 272px;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px dashed #000000;
            border-radius: 50px;

            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 100px;
            text-align: center;

            color: #707070;
        }
        
        input[type="file"] {
            position: absolute;
            top: 50%;
            left: 53%;
            transform: translate(-50%, -50%);
        }

        .signup-form__submit-button {
            width: 468px;
            height: 63px;
            position: absolute;
            top: 640px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #edcb98;

            color: #ffffff;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;

            text-align: center;
        }
    }

    .signup-form__input {
        .signup-form__input-name {
            width: 453px;
            height: 63px;
            padding-left: 15px;
            position: absolute;
            top: 230px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #e9e9e9;

            color: #707070;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;
        }

        .signup-form__input-id {
            width: 453px;
            height: 63px;
            padding-left: 15px;
            position: absolute;
            top: 324px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #e9e9e9;

            color: #707070;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;
        }

        .signup-form__input-id:focus {
            outline: none;
        }

        .signup-form__input-pwd {
            width: 453px;
            height: 63px;
            padding-left: 15px;
            position: absolute;
            top: 418px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #e9e9e9;

            color: #707070;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;
        }

        .signup-form__input-pwd:focus {
            outline: none;
        }

        .signup-form__input-confirm-pwd {
            width: 453px;
            height: 63px;
            padding-left: 15px;
            position: absolute;
            top: 512px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #e9e9e9;

            color: #707070;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;
        }

        .signup-form__input-confirm-pwd:focus {
            outline: none;
        }

        .signup-form__submit-button {
            width: 468px;
            height: 63px;
            position: absolute;
            top: 640px;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 50px;
            background-color: #edcb98;

            color: #ffffff;
            font-family: 'Lao Muang Don';
            font-style: normal;
            font-weight: 400;
            font-size: 30px;
            line-height: 38px;

            text-align: center;
        }
    }

    .signup-form__other {
        width: 200px;
        height: 50px;
        font-size: 12px;
        font-weight: 300;
        position: absolute;
        top: 270px;
        left: 50%;
        transform: translateX(-50%);
        color: #808080;

        .signup-form__sign-up {
            position: absolute;
            top: 5px;
            left: 65px;
            cursor: pointer;

            .login__link {
                color: inherit;
                text-decoration: inherit;
            }
        }

        .signup-form__id-pwd-find {
            position: absolute;
            top: 22px;
            left: 30px;
            cursor: pointer;
        }
    }
`;

function Signup() {
    const [idReg, setIdReg] = useState('')
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [confirmpwdReg, setConfirmpwdReg] = useState('')
    const [selectedOption, setSelectedOption] = useState("user")
    const [viewChooseType, setViewChooseType] = useState(true);
    const [viewSignupDocent, setViewSignupDocent] = useState(false)
    const [viewSignupUser, setViewSignupUser] = useState(false)
    const [viewUploadFile, setViewUploadFile] = useState(false)
    const [fileState, setFileState] = useState('')
    // const [regSuccess, setRegSuccess] = useState(false)
    const navigate = useNavigate()

    const userSignUp = () => {
        if(idReg === "" || usernameReg === "" || passwordReg === "" || confirmpwdReg === ""){
            window.alert("빈칸을 모두 채워주세요.");
            return;
        }
        if(passwordReg !== confirmpwdReg){
            window.alert("비밀번호가 다릅니다.");
            return;
        }
        Axios.post(
            'http://localhost:5000/api/user/signup', 
            {
                id: idReg,
                username: usernameReg,
                password: passwordReg,
            }).then((response) => {
                // setRegSuccess(response.data.success)
                if(response.data.success) {
                    navigate('/login')
                }
        })
    }

    const docentSignUp = (e) => {
        if(idReg === "" || usernameReg === "" || passwordReg === "" || confirmpwdReg === ""){
            window.alert("빈칸을 모두 채워주세요.");
            return;
        }
        if(passwordReg !== confirmpwdReg){
            window.alert("비밀번호가 다릅니다.");
            return;
        }

        let formData = new FormData();
        formData.append('image', fileState)
        formData.append('id', idReg)
        formData.append('password', passwordReg)
        formData.append('username', usernameReg)
        
        Axios.post(
            'http://localhost:5000/api/docent/signup',
            formData).then((response) => {
                console.log(response)
                // setRegSuccess(response.data.success)
                if(response.data.success) {
                    navigate('/login')
                }
        })
    }

    const handleUploadButtonClick = e => {
        if(fileState !== null){
            if(fileState === e.target.files[0])
            e.target.value = '';
        }
        setFileState(e.target.files[0]);
    }

    const onClickHandler = (e) => {
        if(e == "ChooseType"){
            setViewChooseType(true);
            setViewSignupUser(false);
            setViewSignupDocent(false);
            setViewUploadFile(false);
        }
        else if(e == "SignupDocent"){
            setViewSignupDocent(true);
            setViewSignupUser(false);
            setViewChooseType(false);
            setViewUploadFile(false);
        }
        else if(e == "SignupUser"){
            setViewSignupUser(true);
            setViewSignupDocent(false);
            setViewChooseType(false);
            setViewUploadFile(false);
        }
        else if(e == "UploadFile"){
            if(idReg === "" || usernameReg === "" || passwordReg === "" || confirmpwdReg === ""){
                window.alert("빈칸을 모두 채워주세요.");
                return;
            }
            if(passwordReg !== confirmpwdReg){
                window.alert("비밀번호가 다릅니다.");
                return;
            }
            setViewUploadFile(true);
            setViewSignupUser(false);
            setViewSignupDocent(false);
            setViewChooseType(false);
        }
    };

    return (
        <SignupContainer>
            <Rectangle1/>
            <Rectangle2/>
            { viewChooseType && <FormContainer>
                <div className="signup-form__logo">
                    <div className="signup-form__logo-text">Sign Up</div>
                </div>
                <div className="signup-form__choose-type">
                    <div className="form-check-user">
                        <label>일반 사용자</label>
                            <input
                                type="radio"
                                name="user"
                                id="user"
                                value="user"
                                checked={selectedOption === "user"}
                                onChange={(e)=>{
                                    setSelectedOption(e.target.value)
                                }}
                                className="form-check-input"
                            />
                    </div>
                    <div className="form-check-docent">
                        <label>도슨트</label>
                            <input
                                type="radio"
                                name="docent"
                                id="docent"
                                value="docent"
                                checked={selectedOption === "docent"}
                                onChange={(e)=>{
                                    setSelectedOption(e.target.value)
                                }}
                                className="form-check-input"
                            />
                    </div>
                    <button 
                        type="submit" 
                        className="signup-form__submit-button"
                        onClick={()=>onClickHandler(selectedOption === "docent" ? "SignupDocent" : "SignupUser")}>
                        Next
                    </button>
                </div>
            </FormContainer>}
            { viewSignupDocent &&
            <FormContainer>
                <div className="signup-form__logo">
                    <div className="signup-form__logo-text">Sign Up</div>
                </div>
                <div className="signup-form__input">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="User name" 
                        className="signup-form__input-name"
                        onChange={(e) => {
                            setUsernameReg(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="text" 
                        name="id" 
                        placeholder="ID" 
                        className="signup-form__input-id"
                        onChange={(e) => {
                            setIdReg(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="password" 
                        name="pwd" 
                        placeholder="Password" 
                        className="signup-form__input-pwd"
                        onChange={(e) => {
                            setPasswordReg(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="password" 
                        name="confirm-pwd" 
                        placeholder="Confirm Password" 
                        className="signup-form__input-confirm-pwd"
                        onChange={(e) => {
                            setConfirmpwdReg(e.target.value)
                        }}>
                    </input>
                    <button 
                        type="submit" 
                        className="signup-form__submit-button"
                        onClick={()=>onClickHandler("UploadFile")}>
                        Next
                    </button>
                </div>
            </FormContainer>}
            { viewSignupUser && <FormContainer>
                <div className="signup-form__logo">
                    <div className="signup-form__logo-text">Sign Up</div>
                </div>
                <div className="signup-form__input">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="User name" 
                        className="signup-form__input-name"
                        onChange={(e) => {
                            setUsernameReg(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="text" 
                        name="id" 
                        placeholder="ID" 
                        className="signup-form__input-id"
                        onChange={(e) => {
                            setIdReg(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="password" 
                        name="pwd" 
                        placeholder="Password" 
                        className="signup-form__input-pwd"
                        onChange={(e) => {
                            setPasswordReg(e.target.value)
                        }}>
                    </input>
                    <input 
                        type="password" 
                        name="confirm-pwd" 
                        placeholder="Confirm Password" 
                        className="signup-form__input-confirm-pwd"
                        onChange={(e) => {
                            setConfirmpwdReg(e.target.value)
                        }}>
                    </input>
                    <button 
                        type="submit" 
                        className="signup-form__submit-button"
                        onClick={userSignUp}>
                        Sign Up
                    </button>
                </div>
            </FormContainer>}
            { viewUploadFile && <FormContainer>
                <div className="signup-form__logo">
                    <div className="signup-form__logo-text">Sign Up</div>
                </div>
                <div className="signup-form__upload-file">
                    <div className="signup-form__big-rectangle">
                        도슨트 계정 인증을 위한 파일을 업로드해 주세요!
                        <div className="signup-form__small-rectangle">
                            <input
                                type="file" 
                                id="file"
                                accept="image/*"
                                onChange={(e) => handleUploadButtonClick(e)}/>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="signup-form__submit-button"
                        onClick={docentSignUp}>
                        Sign Up
                    </button>
                </div>
            </FormContainer>}
        </SignupContainer>
    )
}

export default Signup