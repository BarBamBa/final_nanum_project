import {useState,useEffect} from "react";
import Notice from "./Notice";
import FreeBoard from "./FreeBoard";
import News from "./News";
import Review from "./Review";
import '../../scss/board/Board.css'
import '../../scss/board/Notice.css'
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "../../scss/Paging.css";



function Board() {
  
  const navigate = useNavigate();
  const location = useLocation();
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
        console.log(data);
        const filteredData = data
        .filter(item => item.flg === boardKind)
        .sort((a, b) => a.id - b.id);
        setBoardData(filteredData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBoards();
  }, [boardKind]);

  useEffect(() => {
    // 페이지 로딩 시 URL 매개변수에서 데이터를 가져와서 boardData를 업데이트
    if (location.state) {
      setBoardName(location.state.boardName);
      setBoardKind(location.state.boardKind);
      console.log(location.state);
    }
  }, [location.state]);

   const navigateBtn =(name, kind) => {
    setBoardName(name);
    setBoardKind(kind);
   }

  return (
    <div>
      <div className="boardContainer">
        <div className="board-nav">
          <h1>{boardName}</h1>
          <div className="board-button">
            <button onClick={()=>{navigate("notice");navigateBtn("공지사항","1");}} 
              style={boardName==="공지사항"?{color:"#546d01"}:null} >공지사항</button>
            <button onClick={()=>{navigate("news");navigateBtn("소식공유","2");}}
              style={boardName==="소식공유"?{color:"#546d01"}:null} >소식공유</button>
            <button onClick={()=>{navigate("freeboard");navigateBtn("자유게시판","3");}}
              style={boardName==="자유게시판"?{color:"#546d01"}:null} >자유게시판</button>
            <button onClick={()=>{navigate("review");navigateBtn("봉사후기","4");}}
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
