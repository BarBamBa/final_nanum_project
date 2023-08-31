import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../scss/admin/AdHeader.scss'

function AdHeader({ setIsLogin }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("nickname");
    localStorage.removeItem("user_email");
    setIsLogin(false);
  }
  return (
    <div className='admin-header'>
      <div className='admin-nav'>
        <ul className='admin-nav-list'>
          <li className='admin-nav-item' onClick={() => { navigate('') }}>게시판</li>
          <li className='admin-nav-item' onClick={() => { navigate('user') }}>회원</li>
          <li className='admin-nav-item' onClick={() => { navigate('qna') }}>문의</li>
          <li className='admin-nav-item' onClick={() => { navigate('volunteer') }}>봉사활동</li>

        </ul>
        <li onClick={handleLogout} className='ad-logout-btn'>로그아웃</li>
      </div>
    </div>
  )
}

export default AdHeader