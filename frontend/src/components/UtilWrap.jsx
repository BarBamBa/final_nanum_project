import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'
import { PiPlantDuotone } from 'react-icons/pi'
import { TokenCheck } from './TokenCheck';
import { BsPersonGear } from 'react-icons/bs'

function UtilWrap() {
  const userInfo = useContext(TokenCheck);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    }
    console.log(isLogin);
    console.log(localStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");
    localStorage.removeItem(undefined);

    setIsLogin(false);
    document.location.href = "/";
  }


  return (
    <>
      {isLogin ? (
        <>
          <div className="loginName">
            {
              userInfo.auth == "ROLE_ADMIN" && <Link to='/admin' className='toAdminPage-btn'><BsPersonGear className='adminBtn'/></Link>
            }
            <Link to={`/MyPage`} className='welcomeBox'>
              <PiPlantDuotone className='loginImg' />
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