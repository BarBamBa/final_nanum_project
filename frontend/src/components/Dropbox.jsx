import React, { useState } from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';
import About from '../pages/about/About'
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
            <li className='dropItem'><Link to={'board/'} state={{boardKind:"1", boardName:"공지사항"}}>공지사항</Link></li>
            <li className='dropItem'><Link to={'board/news'} state={{boardKind:"2", boardName:"소식공유"}}>소식공유</Link></li>
            <li className='dropItem'><Link to={'board/freeboard'} state={{boardKind:"3", boardName:"자유게시판"}}>자유게시판</Link></li>
            <li className='dropItem'><Link to={'board/review'} state={{boardKind:"4", boardName:"봉사후기"}}>봉사후기</Link></li>
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
            <li className='dropItem'><Link to='/MyVolunteer'>나의자원봉사</Link></li>
            <li className='dropItem'><Link to='/wishList'>관심목록</Link></li>
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