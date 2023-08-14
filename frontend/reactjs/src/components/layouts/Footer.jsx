import React from 'react'
import { Link } from 'react-router-dom';
import '../../scss/Footer.scss'
function Footer() {
  return (
    <footer>
      <ul className='footerMenu'>
        <li className='footerMenuName'>소개</li>
        <li className='footerMenuList'><Link to='/about'>나눔 소개</Link></li>
      </ul>
      <ul className='footerMenu'>
        <li className='footerMenuName'>봉사활동검색</li>
        <li className='footerMenuList'><Link to='/volunteer'>봉사활동검색</Link></li>
      </ul>
      <ul className='footerMenu'>
        <li className='footerMenuName'>게시판</li>
        <li className='footerMenuList'><Link to='/notice'>공지사항</Link></li>
        <li className='footerMenuList'><Link to='/news'>소식공유</Link></li>
        <li className='footerMenuList'><Link to='/board'>자유게시판</Link></li>
        <li className='footerMenuList'><Link to='/review'>후기게시판</Link></li>
      </ul>
      <ul className='footerMenu'>
        <li className='footerMenuName'>마이페이지</li>
        <li className='footerMenuList'><Link to='/mypage'>회원정보</Link></li>
        <li className='footerMenuList'><Link to='/mypage/volunteerList'>나의자원봉사</Link></li>
        <li className='footerMenuList'><Link to='/mypage/wishList'>관심목록</Link></li>
      </ul>
      <ul className='footerMenu'>
        <li className='footerMenuName'>고객센터</li>
        <li className='footerMenuList'><Link to='/qna'>QnA</Link></li>
      </ul>
    </footer>
  )
}

export default Footer