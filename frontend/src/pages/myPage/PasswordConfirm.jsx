import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import '/src/scss/myPage/PasswordChange.scss'


function PasswordConfirm() {

  const [password, setPassword] = useState('');
  

  // === 비밀번호 암호화 ===========================================================================
  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });
  
  const handlePasswordType = (e) => {
    setpwType(() => {
    // 만약 현재 pwType.visible이 false 라면
      if (!pwType.visible) {
        return { type: "text", visible: true };

  //현재 pwType.visible이 true 라면
      } else {
        return { type: "password", visible: false };
      }
    });
  };

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',

  });

  //======== 비밀번호 ==============================================
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  }

  //===== 유저 정보 호출 ====================================================
  async function fetchProfile() {

    fetch("/api/user/me", {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+ localStorage.getItem("accessToken"),
      }
    })  

      .then((response) => response.json())

      .then((data) => {

        setUserInfo(data);
        // setPhoneTouched(true);
        console.log(data);
        console.log(localStorage)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);


   //======== 비밀번호 확인 요청 ==============================================
   const onClickPassword = () => {
    console.log("click login");
    console.log("Email : ", userInfo.email);
    console.log("password : ", password)

    if (password === '') {
      alert('비밀번호를 입력해주세요.');
    } else {
      axios
        .post("api/login", {
          email: userInfo.email,
          password: password,
        })
        .then(() => {
          console.log("비밀번호가 일치합니다!");
          alert("비밀번호가 일치합니다!");
          document.location.href = "/ChangePassword";
        })
        .catch(error => {
          console.error(error);
          alert("비밀번호가 일치하지 않습니다.")
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
       <form>
        <div className="pageTitle">
          <span>비밀번호 확인</span>
        </div>

          <div className='PW-Container'>
          <img className="PW-logo-size" src="/images/logo.png" alt="로고이미지" />
              <div className='PW-Confirm'>비밀번호 입력 : 
                  <input 
                      type={pwType.type}
                      onChange={onPasswordHandler}
                      className='PW-Confirm-box' 
                      placeholder='비밀번호를 입력해 주세요' 
                      name='password'
                      title='password'
                      value={password}
                      onKeyPress={OnkeyPress}
                  >            
                  </input>   

                  <span className='chek-PWShowBtn' onClick={handlePasswordType}>
                      {pwType.visible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  </span>
                  
              </div>

              <button type='button' className='PW-Confrim-Btn' onClick={onClickPassword}>비밀번호 확인</button>
          </div>
        </form>
    </>
   
  )
}

export default PasswordConfirm


