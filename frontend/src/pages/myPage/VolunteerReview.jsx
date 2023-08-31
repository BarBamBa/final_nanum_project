import React, { useContext, useEffect, useState } from 'react'
import VolunteerHeaders from './VolunteerHeaders'
import { LuFlower } from 'react-icons/lu'
import { BiEditAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { TokenCheck } from '../../components/TokenCheck'

function VolunteerReview() {

  const [ myBoardList, setMyBoardList ] = useState();

  const userInfo = useContext(TokenCheck);

  //봉사내역조회
  async function fetchMyBoardList() {
    await fetch(`/api/boards/myBoard/${userInfo.userId}`, {
      method: 'GET',  // POST 요청으로 변경
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
  }

  useEffect(() => {
    fetchMyBoardList();
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
              <div className="request-CLCode"><LuFlower className='flowerIcon'/>{item.flg}</div> 
              <div className="request-program-title">
                <div>{item.title}</div>
              </div>
              <div className="request-detail">
                <span>작성날짜: {item.createAt}</span>
                <span>수정날짜: {item.updateAt}</span> 
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