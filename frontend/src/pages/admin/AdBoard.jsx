import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AdBoardList from '../../components/AdBoardList';
import '../../scss/admin/AdBoard.scss'

function AdBoard() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);
  const [reportData, setReportData] = useState([]);

  //-----------페이징-------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  //-----------페이징-------------

  // 게시판 조회
  async function fetchBoards() {
    await fetch("/api/admin/boards")
      .then((res) => res.json())
      .then((data) => {
        setBoardData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //카테고리로 조회
  async function selectCategory(category) {
    console.log(category);
    await fetch("/api/admin/boards/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flg: category })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("selectCategory",data);
        setBoardData(data);
      })
  }

  //신고된 게시판 조회
  async function reportedBoard(id) {
    console.log(id);
    await fetch("/api/admin/boards/reported", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board: id })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReportData(data);
      })

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
          reportData={reportData}
          page={page}
          handlePageChange={handlePageChange}
          fetchBoards={fetchBoards}
          selectCategory={selectCategory}
          reportedBoard={reportedBoard}
        />
      </div>
    </>

  )
}

export default AdBoard