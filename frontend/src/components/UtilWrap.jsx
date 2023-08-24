import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'
import { useToken } from './TokenCheck';

function UtilWrap() {

  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(false);
  
  useEffect(() => {
    if (sessionStorage.getItem("nickname")) {
      setIsLogin(true);
      console.log("isLogin ?? :: ", isLogin);
    }
    console.log(isLogin);
  }, [isLogin])

  
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("nickname");
    setIsLogin(false);
  }
  
  
  return (
    <>
     {isLogin ? (
        <>
          <div className="loginName">
            <Link to={`/MyPage`} >
              <img src="/images/mainProfile.png" className='loginImg' />
              {sessionStorage.getItem("nickname")} 
             님! 안녕하세요!
            </Link>
            
            <Link to={'/'} onClick={handleLogout} className='logoutBtn'>
              로그아웃 <img src='/images/logoutIcon.png' />
            </Link>
          </div>

 
        </>
      ) : (
        <>
          <ul className='utilWrap'>
            <li className='utilItem2'>
              <Link to='/login'>로그인</Link>
            </li>
            <li className='utilItem3'>
              <Link to='/signup'>회원가입</Link>
            </li>
          </ul>
        </>
      )}
      
    </>
  )
}

export default UtilWrap