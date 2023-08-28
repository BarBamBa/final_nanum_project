import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiExternalLink } from 'react-icons/fi'
import '/src/scss/myPage/MyPage.scss'
import VolunteerHeaders from './VolunteerHeaders';





function MyPage() {

  const [userInfo, setUserInfo] = useState({});

  async function fetchProfile() {

    fetch("/api/user/me", {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+ localStorage.getItem("accessToken"),
      }
    })

      .then((response) => response.json())

      .then((data) => {

        setUserInfo(data);

        console.log(data);
        console.log(localStorage)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

    const navigate = useNavigate();

    const myPageModify = () => {
      navigate('/MypageModify');
    }
 
    
return (

    <>
      <VolunteerHeaders />
      <form className='mypage-form'>
        <div className="myPage-Container">
          {/* ==이름========== */}
            <div className="myPage-category">이름</div>
            <div className="myPage-textBox">{userInfo.name}</div>
          {/* ==이메일========== */}
            <div className="myPage-category">이메일</div>
            <div className="myPage-textBox">{userInfo.email}</div>
          {/* ==닉네임 전화번호========== */}
            <div className="myPage-category">닉네임</div>
            <div className="myPage-textBox">{userInfo.nickname}</div>
            <div className="myPage-category">전화번호</div>
            <div className="myPage-textBox">{userInfo.phone}</div>
          {/* ==주소========== */}
            <div className="myPage-category">주소</div>
            <div className="myPage-textBox">{userInfo.address}</div>   
          {/* ==나의 자원봉사 및 정보수정 버튼========== */}
          <div className='buttonBox'>
              <Link to={`/PasswordConfirm`}>
                <button type='button' className="myPage-password-btn">비밀번호 변경</button>
              </Link>
            <div className="myPage-btn-div">
              <Link to={`/MypageModify`}>
                <button  className="myPage-btn">정보수정하기</button>
              </Link>
            </div>
          </div>       
        </div>
      </form>
    </>

  )
}

export default MyPage