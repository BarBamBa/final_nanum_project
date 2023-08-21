import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'


function UtilWrap() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("name") === null) {
      console.log("isLogin ?? :: ", isLogin);
    } else {
      setIsLogin(true);
      console.log("isLogin ?? :: ", isLogin);
    }

  })

  
  const handleLogout = () => {
    // Perform logout actions here, e.g., clearing session storage
    sessionStorage.removeItem("name");
    setIsLogin(false);
  }
  

  

  return (
    <>
     {isLogin ? (
        <>
          
          <Link to={`/MyPage`} className="loginName">
            
            <img src="/images/mainProfile.png" className='loginImg' />
            {sessionStorage.getItem("name")} 님! 안녕하세요! 

            <Link to={'/'} onClick={handleLogout} className='logoutBtn'>
            로그아웃 <img src='/images/logoutIcon.png' />
           </Link>

          </Link>

         

   
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