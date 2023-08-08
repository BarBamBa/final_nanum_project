import React from 'react'
import { Form, Link } from 'react-router-dom';
import '../scss/VolunteerBanner.scss'
import { BsPlusLg } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
function VolunteerBanner() {
  return (
    <>
      <div className='vBannerBackground'>
        <div className='vBannerTitle'>모집중인 자원봉사</div>
        <div className='toVolunteerPage'><Link to='/volunteer' className='toVolunteerPage'><BsPlusLg />더보기</Link></div>      
        <div className='vBannerListBox'>
          {/* 온클릭 넣을거 */}
          <p><IoIosArrowBack className='vArrowBack' /></p>
            <div className='vBannerList'>
              <div className='region'>봉사지역</div>
              <div className='title'>봉사제목</div>
              <div className='recruitmentPeriod'>모집기간</div>
              <div className='recruitmentNumber'>모집인원</div>
              <div className='volunteerPeriod'>봉사기간</div>
              <div className='goToVolunteer'><Link to='/volunteer/vol=num' className='goToVolunteer'>상세보기<IoIosArrowForward className='arrowFoward'/></Link></div>
            </div>  
            <div className='vBannerList'>
              <div className='region'>봉사지역</div>
              <div className='title'>봉사제목</div>
              <div className='recruitmentPeriod'>모집기간</div>
              <div className='recruitmentNumber'>모집인원</div>
              <div className='volunteerPeriod'>봉사기간</div>
              <div className='goToVolunteer'><Link to='/volunteer/vol=num' className='goToVolunteer'>상세보기<IoIosArrowForward className='arrowFoward'/></Link></div>
            </div>  
            <div className='vBannerList'>
              <div className='region'>봉사지역</div>
              <div className='title'>봉사제목</div>
              <div className='recruitmentPeriod'>모집기간</div>
              <div className='recruitmentNumber'>모집인원</div>
              <div className='volunteerPeriod'>봉사기간</div>
              <div className='goToVolunteer'><Link to='/volunteer/vol=num' className='goToVolunteer'>상세보기<IoIosArrowForward className='arrowFoward'/></Link></div>
            </div>  
            <div className='vBannerList'>
              <div className='region'>봉사지역</div>
              <div className='title'>봉사제목</div>
              <div className='recruitmentPeriod'>모집기간</div>
              <div className='recruitmentNumber'>모집인원</div>
              <div className='volunteerPeriod'>봉사기간</div>
              <div className='goToVolunteer'><Link to='/volunteer/vol=num' className='goToVolunteer'>상세보기<IoIosArrowForward className='arrowFoward'/></Link></div>
            </div>  
          <p><IoIosArrowForward className='vArrowForward' /></p>
        </div>
        
      </div>
    </>
  )
}

export default VolunteerBanner