import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AdVolunteerList from '../../components/admin/AdVolunteerList';
import '../../scss/admin/AdVolunteer.scss'


function AdVolunteer() {

  const [volData, setVolData] = useState([]);

  //-----------페이징-------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  //-----------페이징-------------

  // 게시판 조회
  async function fetchVolunteer() {
    await fetch("/api/admin/volunteer")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVolData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

    //카테고리로 조회
    async function selectCategory(category) {
      console.log(category);
      await fetch("/api/admin/volunteer/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: category })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("selectCategory", data);
          setVolData(data);
        })
        .catch((error) => {
          console.log(error);
        })
    }

  useEffect(() => {
    fetchVolunteer();
  }, []);

  return (
    <div className='ad-container'>
      <h1>봉사활동 신청 리스트</h1>
      <AdVolunteerList
        volData={volData}
        page={page}
        handlePageChange={handlePageChange}
        fetchVolunteer={fetchVolunteer}
        selectCategory={selectCategory}
      />
    </div>
  )
}

export default AdVolunteer