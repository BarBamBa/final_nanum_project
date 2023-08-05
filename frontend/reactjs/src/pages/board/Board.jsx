import React from "react";
import Notice from "./Notice";
import FreeBoard from "./FreeBoard";
import News from "./News";
import Review from "./Review";
import '../../scss/board/Board.css'
import '../../scss/board/Notice.css'
import { Route, Routes, useNavigate } from "react-router-dom";

function Board() {
  const navigate = useNavigate();
  return (
    <div>      

      <container>
        <div className="board-nav">
          <h2>공지사항</h2>
            <button onClick={()=>{navigate("notice")}}>공지사항</button>
            <button button onClick={()=>{navigate("news")}}>소식공유</button>
            <button onClick={()=>{navigate("freeboard")}}>자유게시판</button>
            <button onClick={()=>{navigate("Review")}}>봉사후기</button>
        </div>      
        <Routes>
          <Route path="notice" element={<Notice />} />
          <Route path="freeboard" element={<FreeBoard />} />
          <Route path="news" element={<News />} />
          <Route path="review" element={<Review />} />
        </Routes>
      </container>


    </div>
  );
}

export default Board;
