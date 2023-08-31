import React, { useContext, useEffect, useState } from 'react'
import VolunteerHeaders from './VolunteerHeaders'
import '/src/scss/myPage/MyVolunteer.scss'
import { LuFlower } from 'react-icons/lu'
import { TokenCheck } from '../../components/TokenCheck'
import { format } from 'date-fns'
import { FiCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function VolunteerReview() {

  const [ myBoardList, setMyBoardList ] = useState([]);

  const userInfo = useContext(TokenCheck);

  //내가 쓴 글 조회
  async function fetchMyBoardList() {

    if (userInfo.userId) {
      // let userId = userInfo.userId;

    await fetch(`/api/boards/myBoard/${userInfo.userId}`, {
      method: 'POST',  // POST 요청으로 변경
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyBoardList(data);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.log("아이디없음");
    }
  }

  useEffect(() => {
    fetchMyBoardList();
    console.log(myBoardList);
  }, [userInfo.userId]);

  return (
    <>
      <form>
        <div className='volunteer-request-container'>
          <VolunteerHeaders/>
          {myBoardList && myBoardList.map((item, i) => (
          <div className="volunteer-request-list" key={item.id}>
            {/* <div className="volunteer-request">작성한글 [전체 3건]</div> */}
            <div className="category-top"></div>
            <div className="volunteer-request-table">
              <div className="request-CLCode"><LuFlower className='flowerIcon'/>{item.flg === '3' ? "자유게시판" : item.flg === '4' ? "봉사후기" : ""}</div> 
              <div className="request-program-title">
                <div>
                  <Link to={`/board/detail/${item.id}`} state={{id: item.id}}>{item.title}</Link>
                </div>
              </div>
              <div className="request-detail">
                <span><FiCircle className='circleIcon'/>작성날짜: {format(new Date(item.createAt), 'yyyy-MM-dd')}</span>
                <span><FiCircle className='circleIcon'/>수정날짜: {format(new Date(item.updateAt), 'yyyy-MM-dd')}</span> 
              </div>
              <div className='buttonBox'>
                {/* <Link to='/board/review'>수정하러가기<BiEditAlt/></Link> */}
              </div>
            </div>
            <div className="category-bottom"></div>
          </div>
          ))}
        </div>
      </form>
    </>
  )
}

export default VolunteerReview