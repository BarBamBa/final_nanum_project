import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/MyPage.css'





function MyPage() {
  let { email } = useParams();

  const [userInfo, setUserInfo] = useState({}); 

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/mypage");
        if (!response.ok) {
          throw new Error("유저 정보를 가져오지 못햇습니다.");
        }
        const data = await response.json();
        console.log(data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, []);

   
  return (

    <>
      <form className='mypage-form'>

        <div className="myPage-head-font">회원정보</div>

        <div className="myPage-head-bottom"></div>

        <div className="myPage-Container">

          
          <article className="myPage-Item">
      
            <div className="profile-icon-bg">
              <img src="/images/profile.png" className="profile-icon" alt="프로필 아이콘"></img>    
            </div>
  
            <div className="myPage-email">{userInfo.email}</div>
            {/* {userInfo.email} */}
        
          </article>

          {/* ==이름========== */}
            <div className="myPage-Item">

            <div className="myPage-category">이름</div>
            
            <div className="myPage-textBox">{userInfo.name}</div>
            {/* {userInfo.name} */}

          {/* ==닉네임 전홥번호========== */}
            <div className="myPage-span">
              <span>닉네임</span>
              <span>전화번호</span>
            </div>

            <div className="myPage-textBox2">
              <span>{userInfo.nickname}</span>
              <span>{userInfo.phone}</span>
            </div>


          {/* ==주소========== */}

            <div className="myPage-category">주소</div>
  
      
          <div className="myPage-textBox">{userInfo.address}</div>
          {/* {userInfo.address} */}

          {/* ==이메일========== */}
            <div className="myPage-category">이메일</div>
            <div className="myPage-textBox">{userInfo.email}</div>
            <Link to={`/MyVolunteer`} className="mypage-change">
                  나의 자원봉사
              <img src="/images/siteChange.png" className="siteIcon" alt="외부사이트 이동 아이콘"></img> 
            </Link>
          </div>
          
      
        </div>
        
        <div className="myPage-btn">
          <button>정보수정하기</button>
        </div>

    </form>

    </>

  )
}

export default MyPage