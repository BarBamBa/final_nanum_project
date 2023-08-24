import React from 'react'
import VolunteerHeaders from './VolunteerHeaders'

function VolunteerReview() {
  return (
    <>
      <form>    
      
        <VolunteerHeaders></VolunteerHeaders>

        <br/><br/><br/>
      
        <div class="volunteer-request-container">
          <div class="volunteer-request">내가작성한글 [전체 3건]</div>
          <div class="category-bottom"></div>
          
          <table class="volunteer-request-table">

            <thead class="request-title">
              <tr>
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이 봉사후기입니다.</td>
              </tr>

              <tr>
                <td class="request-content-under">
                  [작성일] 2023.07.31
                </td>
              </tr>
            </tbody>
          </table>
        <div class="request-bottom"></div>

          <table class="volunteer-request-table">

            <thead class="request-title">
              <tr>
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이 봉사후기입니다.</td>
              </tr>

              <tr>
                <td class="request-content-under">
                  [작성일] 2023.07.31
                </td>
              </tr>
            </tbody>
            </table>
          <div class="request-bottom"></div>


            <table class="volunteer-request-table">

            <thead class="request-title">
              <tr>
                <td>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</td>
              </tr>
            </thead>

            <tbody>
              <tr class="request-content">
                <td>해오름어린이 봉사후기입니다.</td>
              </tr>

              <tr>
                <td class="request-content-under">
                  [작성일] 2023.07.31
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

export default VolunteerReview