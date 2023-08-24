import React from 'react'
import '../../scss/qna/qna.scss'
import QnaTab from './QnaTab';
import FaqTab from './FaqTab';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

function Qna() {
  const navigate = useNavigate();
  const [qnaKind, setQnaKind] = useState("1"); //1: FAQ  2:QNA
  const [qnaData, setQnaData] = useState([]);

  // 문의글 리스트 조회
  async function fetchQna() {
    await fetch("/api/qna")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);        
        const filteredData = data
        .filter(item => item.flg === qnaKind);
        setQnaData(filteredData);
      })
  }
  useEffect(() => {
    fetchQna();
  }, [qnaKind])

  return (
    <>
      <div className="qnaContainer">
        <div className="qna-nav">
          <h1>QnA</h1>
        </div>
        <div className='qna-notice'>
          <ul>
            <li>
              <b>개인정보보호법 시행에 따라 개인정보가 포함된 글을 등록할 수 없으며, 이를 위반 시 동법 벌칙 규정에 따라 불이익을 받을 수
                있으니 게시물 작성 시 주의하시기 바랍니다.</b>
            </li>
            <li>
              이곳은 자원봉사자의 궁금한 사항을 문의를 하는 곳 입니다.글쓰기 전에 먼저 자주하는질문을 보시면 빠르게 확인하실 수 있습니다.
            </li>
            <li>
              자원봉사 질문과답변에 관련없거나 목적에 맞지 않는 내용의 게시물은 익일 예고 없이 삭제되니 이점 양지하시길 바랍니다.
            </li>
          </ul>
        </div>
        <div className='qna-tab'>
          <button className='qna-button' onClick={() => { navigate(""); setQnaKind("1") }}
            style={qnaKind === "1" ? { color: "#546d01" } : null} >FAQ</button>
          <button className='qna-button' onClick={() => { navigate("qna"); setQnaKind("2") }}
            style={qnaKind === "2" ? { color: "#546d01" } : null}>QnA</button>
        </div>
        <Routes>
          <Route path='' element={<FaqTab qnaData={qnaData}/>} />
          <Route path='qna' element={<QnaTab qnaData={qnaData}/>} />
        </Routes>
      </div>
    </>

  )
}

export default Qna