import React from 'react'
import './css/VolunteerSpec.css'
import VolunteerHeaders from './VolunteerHeaders'

function VolunteerSpec() {
  return (
    <>
      <form>    
      
        <VolunteerHeaders></VolunteerHeaders>

        <br/><br/><br/>
      
        <div class="volunteer-request-container">
          <div class="volunteer-request">봉사내역 [전체 4건]</div>
          <div class="category-bottom"></div>
          
          <table class="volunteer-request-table">
            <thead class="request-title">
              <tr>
                <td>생활편의지원 {'>'} 활동보조</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
                <a href='http://localhost:5173/board' class="review-change">봉사후기 작성
                  <img src="/images/siteChange.png" class="siteIcon" alt="외부사이트 이동 아이콘" />
                </a>
              </tr>

              <tr>
                <td class="request-content-under">
                  [모집기관] 해오름어린이집 
                  <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="request-bottom"></div>

          <table class="volunteer-request-table">
            <thead class="request-title">
              <tr>
                <td>생활편의지원 {'>'} 활동보조</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
                <a href='http://localhost:5173/board' class="review-change">봉사후기 작성
                  <img src="/images/siteChange.png" class="siteIcon" alt="외부사이트 이동 아이콘" />
                </a>
              </tr>

              <tr>
                <td class="request-content-under">
                  [모집기관] 해오름어린이집 
                  <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="request-bottom"></div>

          <table class="volunteer-request-table">
            <thead class="request-title">
              <tr>
                <td>생활편의지원 {'>'} 활동보조</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
                <a href='http://localhost:5173/board' class="review-change">봉사후기 작성
                  <img src="/images/siteChange.png" class="siteIcon" alt="외부사이트 이동 아이콘" />
                </a>
              </tr>

              <tr>
                <td class="request-content-under">
                  [모집기관] 해오름어린이집 
                  <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="request-bottom"></div>

          <table class="volunteer-request-table">
            <thead class="request-title">
              <tr>
                <td>생활편의지원 {'>'} 활동보조</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
                <a href='http://localhost:5173/board' class="review-change">봉사후기 작성
                  <img src="/images/siteChange.png" class="siteIcon" alt="외부사이트 이동 아이콘" />
                </a>
              </tr>

              <tr>
                <td class="request-content-under">
                  [모집기관] 해오름어린이집 
                  <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="request-bottom"></div>

          
        </div>

      </form>
    
    </>
  )
}

export default VolunteerSpec