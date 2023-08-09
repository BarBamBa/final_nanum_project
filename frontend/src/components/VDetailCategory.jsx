import React from 'react'
import '/src/scss/VDetailCategory.scss'


function VDetailCategory() {
  return (
    <div className='VDetailCategory'>
      <div className='buttonLine'>
        <button>목록으로</button>
        <button>신청하기</button>
      </div>
      <div className='vDetailCategory'>
        <div className='categoryItem'>봉사제목</div>
        <div className='categoryItem'>모집기간:</div>
        <div className='categoryItem'>봉사기간:</div>
        <div className='categoryItem'>모집인원:</div>
        <div className='categoryItem'>신청인원:</div>
        <div className='categoryItem'>봉사장소:</div>
        <div className='categoryItem'>봉사기관:</div>
        <div className='categoryItem'>봉사자유형:</div>
        <div className='categoryItem'>활동요일:</div>
        <div className='categoryItem'>봉사분야:</div>
        <div className='categoryItem'>봉사시간:</div>
        <div className='categoryItem'>첨부파일:</div>
      </div>
      <div className='vDetailContents'>
        내용
      </div>
      <div className='contactList'>
        <div className='contactItem'>담당자명:</div>
        <div className='contactItem'>전화번호:</div>
        <div className='contactItem'>FAX:</div>
        <div className='contactItem'>주소:</div>
      </div>
    </div>
  )
}

export default VDetailCategory