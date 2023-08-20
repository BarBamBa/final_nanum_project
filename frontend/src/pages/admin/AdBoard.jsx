import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../scss/admin/AdBoard.scss'

function AdBoard() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);

  const [checkItems, setCheckItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const selectAllBtn = () => {
    setSelectAll(!selectAll);
  }

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

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      console.log("wow");
      const idArray = [];
      // 전체 체크 박스가 체크 되면 id를 가진 모든 elements를 배열에 넣어주어서,
      // 전체 체크 박스 체크
      posts.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }

    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
    }
  };


  return (
    <>
      <div className='ad-container'>
        <h1>게시글 리스트</h1>

        <div className='ad-board'>
          <div className='ad-board-manage-bar'>
            <table className='ad-board-manage-table'>
              <tr>
                <td>게시판 선택</td>
                <td>
                  <select>
                    <option>공지사항</option>
                    <option>소식공유</option>
                    <option>자유게시판</option>
                    <option>봉사후기</option>
                  </select>
                </td>
              </tr>
            </table>

          </div>

          <table className='ad-board-table'>
            <thead>
              <tr>
                <th className="ad-board-head">
                  <input
                    type='checkbox'
                    checked={selectAll}
                    onChange={selectAllBtn} />
                </th>
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
                    <td className="ad-board-checkbox">
                      <input
                        type='checkbox'
                        checked={selectAll}
                      />
                    </td>
                    <td className="ad-board-item ad-board-id">{board.id}</td>
                    <td className="ad-board-item ad-board-title" onClick={() => { navigate(`/board/detail/${board.id}`) }}>{board.title}</td>
                    <td className="ad-board-item ad-board-nick">{board.nick}</td>
                    <td className="ad-board-item ad-board-date">{board.createAt2}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}

export default AdBoard