import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/Header.scss'

function Dropbox() {
  const [menuState, setMenuState] = useState({
    navItem1: false,
    navItem2: false,
    navItem3: false,
    navItem4: false,
    navItem5: false,
  });

  const handleMouseOver = (itemName) => {
    setMenuState((prevState) => ({
      ...prevState,
      [itemName]: true,
    }));
  };

  const handleMouseOut = (itemName) => {
    setMenuState((prevState) => ({
      ...prevState,
      [itemName]: false,
    }));
  };

  return (
    <nav>
      <ul
        className='navItem1'
        onMouseEnter={() => handleMouseOver('navItem1')}
        onMouseLeave={() => handleMouseOut('navItem1')}
      >
        소개
        {menuState.navItem1 && (
          <ul className='dropBox'>
            <li className='dropItem'><Link to='/about'>나눔 소개</Link></li>
          </ul>
        )}
      </ul>
      <ul
        className='navItem2'
        onMouseEnter={() => handleMouseOver('navItem2')}
        onMouseLeave={() => handleMouseOut('navItem2')}
      >
        봉사활동검색
        {menuState.navItem2 && (
          <ul className='dropBox'>
            <li className='dropItem'><Link to='/volunteer'>봉사활동검색</Link></li>
          </ul>
        )}
      </ul>
      <ul
        className='navItem3'
        onMouseEnter={() => handleMouseOver('navItem3')}
        onMouseLeave={() => handleMouseOut('navItem3')}
      >
        게시판
        {menuState.navItem3 && (
          <ul className='dropBox'>
            <li className='dropItem'><Link to='/notice'>공지사항</Link></li>
            <li className='dropItem'><Link to='/news'>소식공유</Link></li>
            <li className='dropItem'><Link to='/board'>자유게시판</Link></li>
            <li className='dropItem'><Link to='/review'>후기게시판</Link></li>
          </ul>
        )}
      </ul>
      <ul
        className='navItem4'
        onMouseEnter={() => handleMouseOver('navItem4')}
        onMouseLeave={() => handleMouseOut('navItem4')}
      >
        마이페이지
        {menuState.navItem4 && (
          <ul className='dropBox'>
            <li className='dropItem'><Link to='/mypage'>회원정보</Link></li>
            <li className='dropItem'><Link to='/mypage/volunteerList'>나의자원봉사</Link></li>
            <li className='dropItem'><Link to='/mypage/wishList'>관심목록</Link></li>
          </ul>
        )}
      </ul>
      <ul
        className='navItem5'
        onMouseEnter={() => handleMouseOver('navItem5')}
        onMouseLeave={() => handleMouseOut('navItem5')}
      >
        고객센터
        {menuState.navItem5 && (
          <ul className='dropBox'>
            <li className='dropItem'><Link to='/qna'>QnA</Link></li>
          </ul>
        )}
      </ul>
    </nav>
  );
}

export default Dropbox