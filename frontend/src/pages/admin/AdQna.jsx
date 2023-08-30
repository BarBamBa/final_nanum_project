import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AdQnaList from '../../components/admin/AdQnaList';
import '/src/scss/admin/AdQna.scss'

function AdQna() {

  const [qnaData, setQnaData] = useState([]);
  const [reportData, setReportData] = useState([]);

  //-----------페이징-------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  //-----------페이징-------------

  // 게시판 조회
  async function fetchQna() {
    await fetch("/api/admin/qna")
      .then((res) => res.json())
      .then((data) => {
        console.log("qnaData", data);
        setQnaData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //카테고리로 조회
  async function selectCategory(category, checked) {
    console.log(category);
    console.log(checked);
    await fetch("/api/admin/qna/category", {
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
          const reportOnlyData = data.filter(item => item.answers.length == 0);
          setQnaData(reportOnlyData);
          return;
        }
        setQnaData(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    fetchQna();
  }, []);


  return (
    <div className='ad-container'>
      <h1>문의글 리스트</h1>
      <AdQnaList
        qnaData={qnaData}
        page={page}
        handlePageChange={handlePageChange}
        fetchQna={fetchQna}
        selectCategory={selectCategory}
      />
    </div>
  )
}

export default AdQna