import React from 'react'
import VolunteerHeaders from './VolunteerHeaders'
import { LuFlower } from 'react-icons/lu'
import { BiEditAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function VolunteerReview() {
  return (
    <>
      <form>
        <div className='volunteer-request-container'>
          <VolunteerHeaders/>
          <div className="volunteer-request-list">
            {/* <div className="volunteer-request">작성한글 [전체 3건]</div> */}
            <div className="category-top"></div>
            <div className="volunteer-request-table">
              <div className="request-CLCode"><LuFlower className='flowerIcon'/>생활편의지원 {'>'} 활동보조</div> 
              <div className="request-program-title">
                <div>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동 수정중입니다</div>
              </div>
              <div className="request-detail">
                <span>[모집기관] 해오름어린이집</span> 
                <span>[봉사기간] selectedDay</span>
              </div>
              <div className='buttonBox'>
                {/* <Link to='/board/review'>수정하러가기<BiEditAlt/></Link> */}
              </div>
            </div>
            <div className="category-bottom"></div>
          </div>
        </div>
      </form>
    </>
  )
}

export default VolunteerReview