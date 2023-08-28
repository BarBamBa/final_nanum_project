import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AdUserList from '../../components/admin/AdUserList';
import '/src/scss/admin/AdBoard.scss'

function AdUser() {

  const [userData, setUserData] = useState([]);

  //-----------페이징-------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  //-----------페이징-------------

  // 게시판 조회
  async function fetchUsers() {
    await fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("userData", data);
        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //카테고리로 조회
  async function selectCategory(category, checked) {
    console.log(category);
    console.log(checked);
    await fetch("/api/admin/boards/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ flg: category })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("selectCategory", data);
        if (checked) {
          const reportOnlyData = data.filter(item => item.reportYn === "Y");
          setBoardData(reportOnlyData);
          return;
        }
        setBoardData(data);
      })
      .catch((error) => {
        console.log(error);
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
    fetchUsers();
  }, []);

  return (
    <div className='ad-container'>
      <h1>회원 리스트</h1>
      <AdUserList
        userData={userData}
        // reportData={reportData}
        page={page}
        handlePageChange={handlePageChange}
        fetchUsers={fetchUsers}
        selectCategory={selectCategory}
        // reportedBoard={reportedBoard}
      />
    </div>
  )
}

export default AdUser