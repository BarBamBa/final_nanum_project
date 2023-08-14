import React, {useState} from 'react'
import './css/MyPage.css'





function MyPage() {

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
  
            <div className="myPage-email">email@gmail.com</div>
        
          </article>

          {/* ==이름========== */}
            <div className="myPage-Item">

            <div className="myPage-category">이름</div>
            
            <div className="myPage-textBox">홍길동</div>


          {/* ==닉네임 전홥번호========== */}
            <div className="myPage-span">
              <span>닉네임</span>
              <span>전화번호</span>
            </div>

            <div className="myPage-textBox2">
              <span>동번서번</span>
              <span>010-1234-1234</span>
            </div>


          {/* ==주소========== */}

            <div className="myPage-category">주소</div>
  
      
          <div className="myPage-textBox">서울특별시 **구 **동 **************</div>


          {/* ==이메일========== */}
            <div className="myPage-category">이메일</div>
            <div className="myPage-textBox">email@gmail.com</div>

            <a href='http://localhost:5173/MyVolunteer' className="mypage-change">나의 자원봉사
              <img src="/images/siteChange.png" className="siteIcon" alt="외부사이트 이동 아이콘"></img> 
            </a>
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