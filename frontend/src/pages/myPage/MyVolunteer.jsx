import React,{useContext, useEffect, useState} from 'react'
import '/src/scss/myPage/MyVolunteer.scss'
import VolunteerHeaders from './VolunteerHeaders'
import { LuFlower } from 'react-icons/lu'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TokenCheck } from '../../components/TokenCheck'; 
import { format } from 'date-fns';
import { FiCircle } from 'react-icons/fi';

function MyVolunteer() {

  //자원봉사 활동내역 정보 저장
  const [volunteerList, setVolunteerList] = useState([]);
  
  
  const userInfo = useContext(TokenCheck);
  // console.log("유저아이디: " + userInfo.userId);
  // console.log("오스: " + userInfo.auth);

  //봉사내역조회
    
  const navigate = useNavigate('');

    
    if (!localStorage.getItem("accessToken")) {
      alert('로그인이 필요합니다.'); 
      navigate('/login');
      return;
    } 

    const myVolunteerList = async () => {
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


  //봉사내역취소
  async function cancel(itemId) {

    let volId = itemId;

    try {
      const response = await fetch(`/api/app/cancel`, {
        method: 'POST', 
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: volId,
        }),
      });
  
      if (response.ok) {
        confirm("취소하시겠습니까?");
        // 취소 후에 봉사내역을 다시 조회하거나 UI를 업데이트할 수 있습니다.
        myVolunteerList();
      } else {
        console.error("봉사활동 취소에 실패했습니다.");
      }
    } catch (error) {
      console.error("봉사활동 취소 요청 중 오류 발생:", error);
    }
  }

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
            item.status === 'C' ? null :

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
                <div className='status'>
                  {
                    item.status === 'R' ? "승인대기" : 
                      item.status === 'Y' ? "승인완료" :
                      item.status === 'N' ? "승인거부" :  
                      "승인대기"
                  }
                </div>
                <label 
                  className={ `cancelBtn ${item.status === 'Y' ? 'block' : item.status === 'D' ? 'block': ''}`} 
                  htmlFor='cancelBtn' 
                  onClick={() => {cancel(item.id)}}>

                  {item.status === 'R' || '\u0000' ? "취소하기" : ""}

                  <button id='cancelBtn'></button>
                </label>
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

export default MyVolunteer