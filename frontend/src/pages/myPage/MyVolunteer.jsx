import React,{useEffect, useState} from 'react'
import '/src/scss/myPage/MyVolunteer.scss'
import VolunteerHeaders from './VolunteerHeaders'
import { LuFlower } from 'react-icons/lu'

function MyVolunteer() {

  //자원봉사 활동내역 정보 저장
  const [myVolunteers , setMyVolunteers] = useState([]);
  //자원봉사활동 총 개수 카운트
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/myVolunteer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //   progrmRegistNo: progrmRegistNo,
        // })
      });
      const result = res.json();
      
      
      return result;
    }

    fetchData().then(res => {
      setMyVolunteers(res);
    });
  }, []);

  console.log(myVolunteers);
  return (

  <>
    <form>
      <VolunteerHeaders /> 
      <div className="volunteer-request-container">
        <div className="volunteer-request">봉사신청 [전체 3건]</div>
        <div className="category-top"></div>
        <div className="volunteer-request-table">
          <div className="request-CLCode"><LuFlower className='flowerIcon'/>생활편의지원 {'>'} 활동보조</div>
          <div className="request-program-title">
            <div>해오름어린이집-경계성 장애 영유아 대상 외부 프로그램 활동</div>
          </div>
          <div className="request-detail">
            <span>[모집기관] 해오름어린이집</span> 
            <span>[봉사기간] selectedDay</span>
          </div>
          <div className='buttonBox'>
            <div className='status'>
              승인상태
            </div>
            <label className='cancleBtn' htmlFor='cancleBtn'>
              취소하기
              <button id='cancleBtn'></button>
            </label>
          </div>
        </div>
        <div>페이지네이션</div>
        <div className="category-bottom"></div>
      </div>
    </form>
  
  </>
  )
}

export default MyVolunteer