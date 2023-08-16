import React, { useState } from 'react'
import './Login.css'


function Login() {

  const [tabText, setTabText] = useState('아이디 찾기');

  const handleTabChange = (event) => {
    setTabText((prevTabText) =>
      prevTabText === '아이디 찾기' ? '비밀번호 찾기' : '아이디 찾기'
    );
  };

  return (
   
    <>
      <form>
        <div className="login-box">
       
       
        <img className="logo-size" src="/images/logo2.png" alt="로고이미지" />
      
          
        <div><input type='text' className="login-textbox" placeholder='아이디를 입력해 주세요'></input></div>
        <div><input type='text' className="login-textbox" placeholder='비밀번호를 입력해 주세요'></input></div>

          <div>
            <button className="login-button">로그인</button>
          </div>

          <a href="/" className="social-button" id="google-connect">
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