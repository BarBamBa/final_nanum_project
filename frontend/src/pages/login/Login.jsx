import React, { useState, useEffect } from 'react'
import '/src/scss/login/Login.scss'
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Link, useNavigate} from 'react-router-dom' 

function Login() {

  const nav = useNavigate();

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

          console.log("로그인 성공");
          console.log(localStorage)
          // 토큰 정보 추출
          localStorage.setItem("email", email);
          localStorage.setItem("nickname", res.data.nickname); // 사용자 이름 저장
          localStorage.setItem("accessToken", res.data.accessToken); // Access Token 저장
          localStorage.setItem("refreshToken", res.data.refreshToken); // Refresh Token 저장
          localStorage.setItem("tokenExpiresIn", res.data.tokenExpiresIn);
          alert("로그인 성공");
          nav("/", true);
      })
      .catch((error) => {
        console.error("로그인 중 에러 발생.", error);
        console.error(error.response.data);
        if(error.response.data == "로그인 실패") {
          alert('입력하신 이메일과 비밀번호를 확인해주세요.');
        }
      });
    }
  }



  //=== 엔터키 이벤트 ========================
  const OnkeyPress = e => {
    if(e.key === 'Enter'){
      onClickLogin();
    }
  }



  return (
    <>
      <form className='login-form'>
        <div className="login-box">
              
          <img className="logo-size" src="/images/logo.png" alt="로고이미지" />
      
            <input type='email' value={email} onChange={onEmailHandler} 
                    name='email' className="login-textbox" placeholder='이메일을 입력해 주세요'>
            </input>

            <input type='password' value={password} onChange={onPasswordHandler} onKeyPress={OnkeyPress}
                    name='password' className="login-textbox" placeholder='비밀번호를 입력해 주세요'>
            </input>
           
          {errorMessage && <p className="login-error-message">{errorMessage}</p>}

            <button className="login-button" type='button' onClick={onClickLogin}>로그인</button>
        
            <a href="http://localhost:9090/oauth2/authorization/google" className="social-button" id="google-connect" >
              <div className="social-button"></div>
            </a>
            
            <div className='page-change-box'>
              <span><Link to='/signup' className="page-change">회원가입</Link> | </span>
              <span><Link to='/finduser' className="page-change">아이디 찾기</Link> | </span>
              <span><Link to='/finduser' className="page-change">비밀번호 찾기</Link></span>
            </div>
        </div>
    
      </form>  
    </>
   
  )
}


export default Login