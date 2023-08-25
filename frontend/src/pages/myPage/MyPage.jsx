import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/MyPage.css'
import { useNavigate } from 'react-router-dom';





function MyPage() {

  const [userInfo, setUserInfo] = useState({}); 

  async function fetchProfile() {

    fetch("/api/user/me", {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+ sessionStorage.getItem("accessToken"),
      }
    })  

      .then((response) => response.json())

      .then((data) => {

        setUserInfo(data);

        console.log(data);
        console.log(sessionStorage)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const modify = ((e) => {
    
  })


    const navigate = useNavigate();

    const myPageModify = () => {
      navigate('/MypageModify');
    }

  


  return (

    <>
      <form className='mypage-form'>

        <div className="myPage-head-font">회원정보</div>

        <div className="myPage-head-bottom"></div>

        <div className="myPage-Container">

          {/* ==이름========== */}
          <div className="myPage-Item">

          <div className="myPage-category">이름</div>
          
          <div className="myPage-textBox">{userInfo.name}</div>


          {/* ==이메일========== */}
          <div className="myPage-category">이메일</div>

          <div className="myPage-textBox">{userInfo.email}</div>


          {/* ==닉네임 전홥번호========== */}

          <div className="myPage-category">닉네임</div>
            
          <div className="myPage-textBox">{userInfo.nickname}</div>

          
          <div className="myPage-category">전화번호</div>
          
          <div className="myPage-textBox">{userInfo.phone}</div>


          {/* ==주소========== */}

          <div className="myPage-category">주소</div>
  
          <div className="myPage-textBox">{userInfo.address}</div>
  

          {/* ==나의 자원봉사 및 정보수정 버튼========== */}

            <Link to={`/MyVolunteer`} className="mypage-change">
                  나의 자원봉사
              <img src="/images/siteChange.png" className="siteIcon" alt="외부사이트 이동 아이콘"></img> 
            </Link>

            <Link to={`/MypageModify`}>
              <button  className="myPage-btn">정보수정하기</button>
            </Link>
          </div>
          
     
        </div>
           
    </form>

    </>

  )
}

export default MyPage