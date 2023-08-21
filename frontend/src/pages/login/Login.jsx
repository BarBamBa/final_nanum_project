import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { GoogleLogin } from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useNavigate} from 'react-router-dom' 

function Login() {

  /*

  구글 clientId: 410023866431-k9tfd6ko1m0km898b2k2qe4f34u0s3is.apps.googleusercontent.com

  구글 clientPw : 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

  */

  const clientId = '410023866431-k9tfd6ko1m0km898b2k2qe4f34u0s3is.apps.googleusercontent.com'
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (res) => {
    console.log(res);
    // Handle successful login
  };

  const handleGoogleLoginFailure = (err) => {
    console.log(err);
    // Handle login failure
  };

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

    axios
      .post("api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res)
        console.log("res.data.email ::", res.data.email);
        console.log("res.data.msg ::", res.data.msg);

        if (email === '') {

          setErrorMessage('이메일을 입력해주세요.');
          return;

        } else if (password === ''){

          setErrorMessage('비밀번호를 입력해주세요.');
          return;

        }else if (res.data.email === undefined) {

          console.log("=======================", res.data.msg);
          alert("입력하신 이메일과 비밀번호를 확인해 주세요.");

        } else if(res.data.email === email) {

          console.log("=======================", "로그인 성공");
          sessionStorage.setItem("user_email", email);
          sessionStorage.setItem("name", res.data.name);
          alert("로그인 성공")

          document.location.href = "/";
        }

      

      })
      .catch();

  }



  //=== 엔터키 이벤트 ========================
  const OnkeyPress = e => {
    if(e.key === 'Enter'){
      onClickLogin();
    }
  }



  return (
    <>
      <form >
        <div className="login-box">
              
        <img className="logo-size" src="/images/logo2.png" alt="로고이미지" />
      
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


          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              className="custom-google-login-button"
             
            />
          </GoogleOAuthProvider>

      

          <a href="/" className="social-button" id="google-connect" >
            <span>Connect with Google</span>
          </a>
          
          <div>
            <span><a href='http://localhost:5173/signup' className="page-change">회원가입</a> | </span>
            <span><a href='http://localhost:5173/finduser' className="page-change">아이디 찾기</a> | </span>
            <span><a href='http://localhost:5173/finduser' className="page-change">비밀번호 찾기</a></span>
          </div>
        </div>
    
      </form>  
    </>
   
  )
}


export default Login