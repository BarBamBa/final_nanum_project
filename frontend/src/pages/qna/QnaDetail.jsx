import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function QnaDetail() {
  let { id } = useParams();

  const [qnaData, setQnaData] = useState();

  useEffect(() => {
    // qna 조회 
    async function fetchQna() {
      fetch("/api/qna/" + id)
        .then((res) => res.json())
        .then((data) => {
          setQnaData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        })
    }
    fetchQna();
  }, []);

  const qnaFlg = (index) => {
    switch (index) {
      case "1":
        return "FAQ";
      case "2":
        return "QnA";
      default:
        return "알 수 없음";
    }
  };
  console.log(qnaData);
  return (
    qnaData && (
      <div className='qna-detail-container'>
        <div className="qna-detail-kind">
          <h1>{qnaFlg(qnaData.flg)}</h1>
        </div>

        <div className='qna-detail-box'>
          <div className='qna-detail-header'>
            <div className='qna-title'>
              <h3>글제목 : {qnaData.mtitle}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default QnaDetail