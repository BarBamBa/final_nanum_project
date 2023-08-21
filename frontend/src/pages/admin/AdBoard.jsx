import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdBoardList from '../../components/AdBoardList';
import '../../scss/admin/AdBoard.scss'

function AdBoard() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);

  //-----------페이징-------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  //-----------페이징-------------

  //게시판 조회
  async function fetchBoards() {
    await fetch("/api/admin/boards")
      .then((response) => response.json())
      .then((data) => {
        setBoardData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <>
      <div className='ad-container'>
        <h1>게시글 리스트</h1>
        <AdBoardList
          boardData={boardData}
          page={page}
          handlePageChange={handlePageChange}
          fetchBoards={fetchBoards}
        />
      </div>
    </>

  )
}

export default AdBoard