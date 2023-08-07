import React,{useState,useEffect} from "react";
import Notice from "./Notice";
import FreeBoard from "./FreeBoard";
import News from "./News";
import Review from "./Review";
import BoardInputForm from "../../components/BoardInputForm";
import BoardDetail from "./BoardDetail";
import '../../scss/board/Board.css'
import '../../scss/board/Notice.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import "../../scss/Paging.css";



function Board() {
  const navigate = useNavigate();
  const [boardName, setBoardName] = useState("공지사항");
  const [boardKind, setBoardKind] = useState("1");
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await fetch("/api/boards");
        if (!response.ok) {
          throw new Error("게시판 정보를 가져오지 못햇습니다.");
        }
        const data = await response.json();
        console.log(data.createAt);
        console.log(data);
        const filteredData = data
        .filter(item => item.boardFlg === boardKind)
        .sort((a, b) => a.id - b.id);
        setBoardData(filteredData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBoards();
  }, [boardKind]);


  return (
    <div>
      <div className="boardContainer">
        <div className="board-nav">
          <h1>{boardName}</h1>
          <div className="board-button">
            <button onClick={()=>{setBoardName("공지사항");navigate("notice");setBoardKind("1");}} 
              style={boardName==="공지사항"?{color:"#546d01"}:null} >공지사항</button>
            <button onClick={()=>{setBoardName("소식공유");navigate("news");setBoardKind("2");}}
              style={boardName==="소식공유"?{color:"#546d01"}:null} >소식공유</button>
            <button onClick={()=>{setBoardName("자유게시판");navigate("freeboard");setBoardKind("3");}}
              style={boardName==="자유게시판"?{color:"#546d01"}:null} >자유게시판</button>
            <button onClick={()=>{setBoardName("봉사후기");navigate("review");setBoardKind("4");}}
              style={boardName==="봉사후기"?{color:"#546d01"}:null} >봉사후기</button>
          </div>
        </div>
 
        <Routes>
          <Route path="notice" element={<Notice boardData={boardData} />} />
          <Route path="news" element={<News boardData={boardData}/>} />
          <Route path="freeboard" element={<FreeBoard boardData={boardData}/>} />             
          <Route path="review" element={<Review boardData={boardData}/>} />
          
        </Routes>
      </div>


    </div>
  );
}

export default Board;
