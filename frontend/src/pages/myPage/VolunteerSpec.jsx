import React from 'react'
import { Link } from 'react-router-dom'
import '/src/scss/myPage/MyVolunteer.scss'
import VolunteerHeaders from './VolunteerHeaders'
// import { LuFlower, TfiWrite } from 'react-icons/*'

function VolunteerSpec() {
  return (
    <>
      <form>    
        <VolunteerHeaders/>
        <div className="volunteer-request-container">
        <div className="volunteer-request">완료된봉사 [전체 3건]</div>
        <div className="category-top"></div>
        <div className="volunteer-request-table">
           <div className="request-CLCode">{/*<LuFlower className='flowerIcon'/>*/}생활편의지원 {'>'} 활동보조</div> 
          <div className="request-program-title">
            <div>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</div>
          </div>
          <div className="request-detail">
            <span>[모집기관] 해오름어린이집</span> 
            <span>[봉사기간] selectedDay</span>
          </div>
          <div className='buttonBox'>
            <Link to='/board/review'>후기쓰러가기_{/*<TfiWrite/>*/}</Link>
          </div>
        </div>
        <div>페이지네이션</div>
        <div className="category-bottom"></div>
      </div>
      </form>
    
    </>
  )
}

export default VolunteerSpec