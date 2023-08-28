import { useState, useEffect, useContext } from "react";
import BoardTab from "./BoardTab";
import '../../scss/board/Board.scss'
import '../../scss/board/Notice.scss'
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "../../scss/Paging.css";
import { TokenCheck } from "../../components/TokenCheck";



function Board() {
  const userInfo = useContext(TokenCheck);
  console.log(userInfo);

  const navigate = useNavigate();
  const location = useLocation();
  const [boardKind, setBoardKind] = useState("1");
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    //게시판 조회
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
        // .sort((a, b) => a.id - b.id);
        setBoardData(filteredData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBoards();
  }, [boardKind]);

  //게시판 검색 조회
  const searchBoards = async (keyword) => {
    console.log("keyword", keyword);
    console.log("boardKind", boardKind);
    let data;
    if (keyword == undefined) {
      data = {
        title: null,
        flg: boardKind
      }
    } else {
      data = {
        title: keyword,
        flg: boardKind
      }
    }

    fetch("/api/boards/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),

    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBoardData(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    // 페이지 로딩 시 URL 매개변수에서 데이터를 가져와서 boardData를 업데이트
    if (location.state) {
      setBoardKind(location.state.boardKind);
    }
  }, [location.state]);


  return (
    <div>
      <div className="boardContainer">
        <div className="board-nav">
          <h1>{boardKind == "1" ?
            "공지사항"
            : boardKind == "2" ?
              "소식공유"
              : boardKind == "3" ?
                "자유게시판"
                : boardKind == "4" ?
                  "봉사후기"
                  : "알수없음"}</h1>
          <div className="board-button">
            <button onClick={() => { setBoardKind("1"); }}
              style={boardKind === "1" ? { color: "#546d01" } : null} >공지사항</button>
            <button onClick={() => { setBoardKind("2"); }}
              style={boardKind === "2" ? { color: "#546d01" } : null} >소식공유</button>
            <button onClick={() => { setBoardKind("3"); }}
              style={boardKind === "3" ? { color: "#546d01" } : null} >자유게시판</button>
            <button onClick={() => { setBoardKind("4"); }}
              style={boardKind === "4" ? { color: "#546d01" } : null} >봉사후기</button>
          </div>
        </div>

        <BoardTab boardData={boardData} searchBoards={searchBoards} userInfo={userInfo} boardKind={boardKind} />

      </div>


    </div>
  );
}

export default Board;
