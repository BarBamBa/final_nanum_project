import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '/src/scss/myPage/MyVolunteer.scss'
import VolunteerHeaders from './VolunteerHeaders'
import { LuFlower } from 'react-icons/lu'
import { BiEditAlt } from 'react-icons/bi'
import { FiCircle } from 'react-icons/fi'
import { TokenCheck } from '../../components/TokenCheck'
import { format } from 'date-fns'

function VolunteerSpec() {

  //자원봉사 활동내역 정보 저장
  const [volunteerList, setVolunteerList] = useState([]);
  
  
    const userInfo = useContext(TokenCheck);
    // console.log("유저아이디: " + userInfo.userId);
    // console.log("오스: " + userInfo.auth);

  //봉사내역조회
    async function myVolunteerList() {
      await fetch(`/api/myVolunteer?userId=${userInfo.userId}`, {
        method: 'POST',  // POST 요청으로 변경
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setVolunteerList(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    useEffect(() => {
      myVolunteerList();
    }, [userInfo.userId]);


  return (
    <>
      <form>
        <div className="volunteer-request-container">
          <VolunteerHeaders /> 
          <div className="volunteer-request-list">
            {/* <div className="volunteer-request">봉사신청 [전체 {volunteerList.length}건]</div> */}
            <div className="category-top"></div>
            {volunteerList.length > 0 && volunteerList.map((item, i) => (
              // status가 'c'인 경우 해당 아이템을 건너뛰고 null을 반환
              item.status !== 'Y' ? null :

              <div className="volunteer-request-table" key={item.id}>
                <div className="request-CLCode"><LuFlower className='flowerIcon'/>{item.category}</div>
                <div className="request-program-title">
                  <Link to={`/vdetail/${item.volunteerNumber}`} state={{progrmRegistNo: item.volunteerNumber}}>{item.volunteerTitle}</Link>
                </div>
                <div className="request-detail">
                  <span><FiCircle className='circleIcon'/>신청날짜: {format(new Date(item.selectedDay), 'yyyy-MM-dd')}</span>
                  <span><FiCircle className='circleIcon'/>봉사시간: {item.selectedStartTime}시 ~ {item.selectedEndTime}시</span>
                </div>
                <div className='buttonBox'>
                  <Link to={`/board/`} state={{boardKind: '4'}}>후기쓰러가기<BiEditAlt/></Link>
                </div>
              </div>
            ))}
            <div className="category-bottom"></div>
          </div>
        </div>
      </form>
    </>
  )
}

export default VolunteerSpec