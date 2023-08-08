import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'


function UtilWrap() {
  const { userStatus, setUserStatus } = useState(false)

  const handleUserStatus = () => {

  }

  return (
    <>
      {
        userStatus ? 
        <ul className='utilWrap'>
          <li className='utilItem1'><Link to='/logout'>로그아웃</Link></li>
        </ul>
        :
        <ul className='utilWrap'>
          <li className='utilItem2'><Link to='/login'>로그인</Link></li>
          <li className='utilItem3'><Link to='/signup'>회원가입</Link></li>
        </ul>
      } 
    </>
  )
}

export default UtilWrap