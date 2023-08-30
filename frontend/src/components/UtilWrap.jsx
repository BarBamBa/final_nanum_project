import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'
import { TokenCheck } from './TokenCheck';

function UtilWrap() {
  const userInfo = useContext(TokenCheck);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("nickname")) {
      setIsLogin(true);
      console.log("isLogin ?? :: ", isLogin);
    }
    console.log(isLogin);
    console.log(localStorage)
  }, [isLogin])


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    setIsLogin(false);
  }


  return (
    <>
      {isLogin ? (
        <>
          <div className="loginName">
            {
              userInfo.auth == "ROLE_ADMIN" && <Link to='/admin'>관리자</Link>
            }
            <Link to={`/MyPage`} className='welcomeBox'>
              <img src="/images/mainProfile.png" className='loginImg' />
              {localStorage.getItem("nickname")}
              님, 안녕하세요!
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