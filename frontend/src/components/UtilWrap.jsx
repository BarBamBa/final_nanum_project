import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'


function UtilWrap() {


  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("nickname")) {
      setIsLogin(true);
      console.log("isLogin ?? :: ", isLogin);
    }
    console.log(isLogin);
    console.log(sessionStorage);
  }, [isLogin])

  
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("nickname");
    setIsLogin(false);
  }
  
  
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    
		if(isLogin){
      console.log(sessionStorage.getItem("accessToken"));
			fetch('/api/user/me', {
				method: 'GET',
				headers: {
					"Content-Type" : "application/json",
					"Authorization" : "Bearer "+ sessionStorage.getItem("accessToken"),
				}
			})
			.then(res => {
				if(res){
					console.log(res);
					return res.json();
				}
			})
			.then(data => {
        console.log(data);
        if(data){
          setUserId(data.id);
        }
      })
		}
	}, [isLogin]);




  return (
    <>
     {isLogin ? (
        <>
          
          <Link to={`/MyPage`} className="loginName">
            
            <img src="/images/mainProfile.png" className='loginImg' />
            {sessionStorage.getItem("nickname")} 님! 안녕하세요! 

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