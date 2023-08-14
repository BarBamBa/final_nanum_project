import React,{useState} from 'react'
import './css/MyVolunteer.css'
import VolunteerHeaders from './VolunteerHeaders'

function MyVolunteer() {


  return (

  <>
    <form>

      <VolunteerHeaders></VolunteerHeaders>
      <br/><br/><br/>
      
      <div className="volunteer-request-container">
        <div className="volunteer-request">봉사신청 [전체 3건]</div>
        <div className="category-bottom"></div>
        
        <table className="volunteer-request-table">

          <thead className="request-title">
            <tr>
              <td>생활편의지원 {'>'} 활동보조</td>
            </tr>
          </thead>

          <tbody>
            <tr className="request-content">
              <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
              <span id="request-status">접수</span>
            </tr>

            <tr>
              <td className="request-content-under">
                [모집기관] 해오름어린이집 
                <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="request-bottom"></div>

        <table className="volunteer-request-table">

          <thead className="request-title">
            <tr>
              <td>생활편의지원 {'>'} 활동보조</td>
            </tr>
          </thead>

          <tbody>
            <tr className="request-content">
              <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
              <span id="request-status2">승인</span>
            </tr>

            <tr>
              <td className="request-content-under">
                [모집기관] 해오름어린이집 
                <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
              </td>
            </tr>
          </tbody>
          </table>

          <div className="request-bottom"></div>


          <table className="volunteer-request-table">

          <thead className="request-title">
            <tr>
              <td>생활편의지원 {'>'} 활동보조</td>
            </tr>
          </thead>

          <tbody>
            <tr className="request-content">
              <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
              <span id="request-status3">종료</span>
            </tr>

            <tr>
              <td className="request-content-under">
                [모집기관] 해오름어린이집 
                <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
              </td>
            </tr>
          </tbody>
          </table>

          <div className="request-bottom"></div>


        

      </div>
    </form>
  
  </>
  )
}

export default MyVolunteer