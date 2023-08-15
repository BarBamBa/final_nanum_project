import React, { useEffect, useState } from 'react'
import '/src/scss/VDetailCategory.scss'
import { useLocation } from 'react-router-dom';


function VDetailCategory() {

  // const location = useLocation();
  // const progrmRegistNo = JSON.stringify(location.state.progrmRegistNo);
  const [data, setData] = useState({});

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('/api/detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              progrmRegistNo : progrmRegistNo,
            })
          });
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => {
          setData(res);
          console.log(res);
        });
    }, []);

  return (
    <div className='vDetail'>
      <div className='buttonLine'>
        <button Link to='/volunteer' id='btnToList'>목록으로</button>
        <button id='btnSubmit'>신청하기</button>
      </div>
      <div className='vDetailCategory'>
        <div className='categoryTitle'>제목 : {data.progrmSj}</div>
        <div className='categoryItem'>모집기간: {data.noticeBgnde} ~ {data.noticeEndde}</div>
        <div className='categoryItem'>봉사기간: {data.progrmBgnde} ~ {data.progrmEndde}</div>
        <div className='categoryItem'>모집인원: {data.rcritNmpr} 명 / 일</div>
        <div className='categoryItem'>신청인원: {data.appTotal} 명</div>
        <div className='categoryItem'>봉사장소: {data.actPlace}</div>
        <div className='categoryItem'>봉사기관:  {data.mnnstNm}</div>
        <div className='categoryItem'>봉사참여유형: {data.adultPosblAt === 'Y' ? '성인 ' : ''}
                                                   {data.yngbgsPosblAt === 'Y' ? '청소년 ' : ''}
                                                   {data.grpPosblAt === 'Y' ? '기업·단체' : ''}
        </div>
        <div className='categoryItem'>활동요일: {data.actWkdy}</div>
        <div className='categoryItem'>봉사분야: {data.srvcClCode}</div>
        <div className='categoryItem'>봉사시간: {data.actBeginTm}시 ~ {data.actEndTm}시 </div>
        <div className='categoryState'>모집상태:  {data.progrmSttusSe === 1 ? '모집대기'
                                               : data.progrmSttusSe === 2 ? '모집중' : '모집완료'}
        </div>
        <div className='categoryFile'>첨부파일: {data.actPlace}</div>
      </div>
      <div className='vDetailContents'>
        <p>{data.progrmCn} 내용냉용내용내용</p>
      </div>
      <div className='contactList'>
        <div className='contactItem'>담당자명: {data.nanmmbyNmAdmn}</div>
        <div className='contactItem'>전화번호: {data.telno}</div>
        <div className='contactItem'>FAX: {data.fxnum}</div>
        <div className='contactItem'>EMAIL: {data.email === 'default' ? '-': data.email}</div>
        <div className='contactItem'>주소: {data.postAdres}</div>
      </div>
    </div>
  )
}

export default VDetailCategory