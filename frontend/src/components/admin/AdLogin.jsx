import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TokenCheck } from '../TokenCheck';
import axios from 'axios';

function AdLogin({setAuth, setIsLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //======== 이메일 ==============================================
    const onEmailHandler = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
    }

    //======== 비밀번호 ==============================================
    const onPasswordHandler = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    }

    ////======== 스프링연결 ==============================================
    const onClickLogin = () => {
        console.log("click login");
        console.log("Email : ", email);
        console.log("Password : ", password);


        if (email === '') {
            setErrorMessage('이메일을 입력해주세요.');
            return;
        } else if (password === '') {
            setErrorMessage('비밀번호를 입력해주세요.');
            return;
        } else {
            axios
                .post("api/login", {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    console.log(res)
                    console.log("res.data.email ::", res.data.email);
                    console.log("res.data.msg ::", res.data.msg);
                    console.log("res.data.nickname ::", res.data.nickname);
                    console.log('토큰 정보:', res.data.refreshToken);

                    if (res.data === '로그인 실패') {
                        alert('입력하신 이메일과 비밀번호를 확인해주세요.');
                    } else {
                        console.log("로그인 성공");
                        console.log(localStorage)
                        // 토큰 정보 추출
                        localStorage.setItem("email", email);
                        localStorage.setItem("nickname", res.data.nickname); // 사용자 이름 저장
                        localStorage.setItem("accessToken", res.data.accessToken); // Access Token 저장
                        localStorage.setItem("refreshToken", res.data.refreshToken); // Refresh Token 저장

                        fetch('/api/user/me', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                            },
                        })
                            .then((res) => {
                                if (res.ok) {
                                    return res.json();
                                }
                                throw new Error('네트워크 응답이 올바르지 않습니다.');
                            })
                            .then((data) => {
                                if (data.authority == "ROLE_USER") {
                                    alert("관리자인증실패");
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("refreshToken");
                                    localStorage.removeItem("nickname");
                                    localStorage.removeItem("email");
                                }
                                if (data.authority == "ROLE_ADMIN") {
                                    alert("관리자인증성공");
                                    setIsLogin(true);
                                    setAuth("ROLE_ADMIN");
                                }
                            })
                            .catch((error) => {
                                console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error during login request:", error);
                });
        }
    }

    //=== 엔터키 이벤트 ========================
    const OnkeyPress = e => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    }

    return (

        <form >
            <div className="login-box">
                <h1>관리자 로그인</h1>
                <div>
                    <input type='email' value={email} onChange={onEmailHandler}
                        name='email' className="login-textbox" placeholder='이메일을 입력해 주세요'>
                    </input>
                </div>

                <div>
                    <input type='password' value={password} onChange={onPasswordHandler} onKeyPress={OnkeyPress}
                        name='password' className="login-textbox" placeholder='비밀번호를 입력해 주세요'>
                    </input>
                </div>

                {errorMessage && <p className="login-error-message">{errorMessage}</p>}

                <div>
                    <button className="login-button" type='button' onClick={onClickLogin}>로그인</button>
                </div>

            </div>

        </form >
    )
}

export default AdLogin