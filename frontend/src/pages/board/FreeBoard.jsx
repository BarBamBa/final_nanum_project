import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
  AiOutlineLeft,
  AiOutlineDoubleLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from "react-icons/ai";



function FreeBoard(props) {
  const boardData = props.boardData;
  console.log(props);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSearchBoard = () => {
    console.log("noticepage", keyword);
    props.searchBoards(keyword);
  }

  const handleWrite = () => {
    console.log(props.userInfo.userId);
    if(props.userInfo.userId == null) {
      alert("로그인 이후 이용 가능한 기능입니다.");
      return;
    }
    navigate('/board/input', {
      state: { boardName: "자유게시판", boardKind: "3", formKind: "write" }
    })
  }

  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;

  const paginatedBoardData = boardData.slice(startIndex, endIndex);
  return (
    <div>
      <div className="search-box">
        <input placeholder="검색어를 입력해주세요" type="text" onChange={(e) => { setKeyword(e.target.value), console.log(keyword); }} ></input>
        <button onClick={handleSearchBoard}>검색</button>
      </div>
      <table className="board-table">
        <thead>
          <tr>
            <th className="table-head">번호</th>
            <th className="table-head">제목</th>
            <th className="table-head">등록일</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBoardData.map((board, i) => {
            return (
              <tr key={board.id}>
                <td className="table-no">{board.id}</td>
                <td className="table-title" onClick={() => { navigate(`/board/detail/${board.id}`) }}>{board.title}</td>
                <td className="table-date">{board.createAt2}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={boardData.length} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        firstPageText={<AiOutlineDoubleLeft />} // "처음"을 나타낼 텍스트
        prevPageText={<AiOutlineLeft />} // "이전"을 나타낼 텍스트
        lastPageText={<AiOutlineDoubleRight />} // "마지막"을 나타낼 텍스트
        nextPageText={<AiOutlineRight />} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
      {/* <button onClick={() => { navigate('/board/input', { state: { boardName: "자유게시판", boardKind: "3", formKind: "write" } }) }}>글쓰기</button> */}
      <button onClick={handleWrite} > 글쓰기 </button>
    </div>
  );
}

export default FreeBoard