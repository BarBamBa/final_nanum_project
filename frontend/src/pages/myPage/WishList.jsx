import React from 'react'
import './css/WishList.css'



function WishList() {

  return (
    <>
      <form>    

      <div class="volunteer-request-container">
        <div class="volunteer-request">관심목록 [전체 4건]</div>
        <div class="category-bottom"></div>


      <div className='WishList-check'>
        <input type="checkbox" className='list-ceckbox'/>
        <label>생활편의지원 {'>'} 활동보조</label>
        <label>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</label>
          <label>[모집기관] 해오름어린이집 
            <span>[봉사기간] 2023.07.31 ~ 2023.08.04</span>
          </label>

      </div> 
       


        
        <div class="request-bottom"></div>

      </div>

    </form>
    </>
  )

}

export default WishList