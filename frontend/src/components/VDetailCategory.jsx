import React, { useEffect, useState } from 'react'
import '/src/scss/VDetailCategory.scss'
import { Link, useLocation } from 'react-router-dom';
import { FiPhone, FiCircle } from 'react-icons/fi'


function VDetailCategory() {
  
  function stringFormat(str) {
    const string = str + "";
    const year = string.substring(0, 4);
    const month = string.substring(4, 6);
    const date = string.substring(6, string.length);
    return year + "-" + month + "-" + date;
  }

  const location = useLocation();
  const progrmRegistNo = JSON.stringify(location.state.progrmRegistNo);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/detail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          progrmRegistNo: progrmRegistNo,
        })
      });
      const result = res.json();
      return result;
    }

    fetchData().then(res => {
      setData(res);
    });
  }, []);

  const handleSubmit = event => {
    if (data.progrmSttusSe === 3) event.preventDefault();
  }

  return (
    <div className='vDetail'>
      <div className='buttonLine'>
        <Link to='/volunteer'><button className='btnToList'>목록으로</button></Link>
        <Link onClick={handleSubmit} to={`/reserve/${progrmRegistNo}`} state={{ data: data }} >
          <button className={data.progrmSttusSe === 3 ? 'btnClose' : 'btnSubmit'}>
            {data.progrmSttusSe === 3 ? '신청마감' : '신청하기'}
          </button>
        </Link>
      </div>
      <div className='vDetailCategory'>
        <div className='categoryItem title'>{data.progrmSj}</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>모집기간</p> {stringFormat(data.noticeBgnde)} ~ {stringFormat(data.noticeEndde)}</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>봉사기간</p> {stringFormat(data.progrmBgnde)} ~ {stringFormat(data.progrmEndde)}</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>모집인원</p> {data.rcritNmpr} 명 / 일</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>신청인원</p> {data.appTotal} 명</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>봉사장소</p> {data.actPlace}</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>봉사기관</p>  {data.mnnstNm}</div>
        <div className='categoryItem'><p className='itemName'>
          <FiCircle className='circleIcon'/>연령제한</p> 
          {data.adultPosblAt === 'Y' ? '성인가능 ' : '성인불가 '}
          {data.yngbgsPosblAt === 'Y' ? '청소년가능 ' : '청소년불가 '}
          {data.grpPosblAt === 'Y' ? '기업·단체 ' : ''}
        </div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>활동요일</p> {data.actWkdy}</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>봉사분야</p> {data.srvcClCode}</div>
        <div className='categoryItem'><p className='itemName'><FiCircle className='circleIcon'/>봉사시간</p> {data.actBeginTm}시 ~ {data.actEndTm}시 </div>
        <div className='categoryItem state'><p className='itemName'><FiCircle className='circleIcon'/>모집상태</p> 
          {data.progrmSttusSe === 1 ? '모집대기' : data.progrmSttusSe === 2 ? '모집중' : '모집완료'}
        </div>
      </div>
      <div className='vDetailContents'>
        <div></div>
        <p>{data.progrmCn}</p>
      </div>
      <div className='contactList'>
        <div className='contactTitle'><FiPhone className='phoneIcon'/>담당자 연락처</div>
        <div className='contactItem'><FiCircle className='circleIcon'/>담당자명: {data.nanmmbyNmAdmn}</div>
        <div className='contactItem'><FiCircle className='circleIcon'/>전화번호: {data.telno}</div>
        <div className='contactItem'><FiCircle className='circleIcon'/>FAX: {data.fxnum}</div>
        <div className='contactItem'><FiCircle className='circleIcon'/>EMAIL: {data.email === 'default' ? '-': data.email}</div>
        <div className='contactItem addr'><FiCircle className='circleIcon'/>주소: {data.postAdres}</div>
      </div>
    </div>
  )
}

export default VDetailCategory