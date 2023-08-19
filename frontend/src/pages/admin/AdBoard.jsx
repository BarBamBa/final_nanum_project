import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../scss/admin/AdBoard.scss'

function AdBoard() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);
  useEffect(() => {
    //게시판 조회
    async function fetchBoards() {
      try {
        const response = await fetch("/api/boards");
        if (!response.ok) {
          throw new Error("게시판 정보를 가져오지 못햇습니다.");
        }
        const data = await response.json();
        console.log(data);
        setBoardData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBoards();
  }, []);
  return (
    <>
      <div className='ad-container'>
        <h1>게시글 리스트</h1>
      </div>
      <div className='ad-board'>

        <table className='ad-board-table'>
          <thead>
            <tr>
              <th className="ad-board-head"><input type='checkbox' /></th>
              <th className="ad-board-head">번호</th>
              <th className="ad-board-head">제목</th>
              <th className='ad-board-head'>작성자</th>
              <th className="ad-board-head">등록일</th>
            </tr>
          </thead>
          <tbody>
            {boardData.map((board, i) => {
              return (
                <tr key={board.id}>
                  <td className="ad-board-checkbox"><input type='checkbox' /></td>
                  <td className="ad-board-id">{board.id}</td>
                  <td className="ad-board-title" onClick={() => { navigate(`/board/detail/${board.id}`) }}>{board.title}</td>
                  <td className="ad-board-nick">{board.nick}</td>
                  <td className="ad-board-date">{board.createAt2}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </>

  )
}

export default AdBoard