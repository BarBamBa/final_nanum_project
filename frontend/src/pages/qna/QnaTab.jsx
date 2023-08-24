import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import {
    AiOutlineLeft,
    AiOutlineDoubleLeft,
    AiOutlineRight,
    AiOutlineDoubleRight,
} from "react-icons/ai";

function QnaTab({ qnaData }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="search-box">
                <input placeholder="검색어를 입력해주세요" type="text" onChange="" ></input>
                <button onClick="">검색</button>
            </div>
            <table className="qna-table">
                <thead>
                    <tr>
                        <th className="qna-head">번호</th>
                        <th className="qna-head">제목</th>
                        <th className="qna-head">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {paginatedBoardData.map((board, i) => {
                        return (
                            <tr key={board.id}>
                                <td className="table-no">{board.id}</td>
                                <td className="table-title" onClick={() => { navigate(`/board/detail/${board.id}`) }}>{board.title}</td>
                                <td className="table-date">{board.createAt2}</td>
                            </tr>
                        );
                    })} */}

                    {qnaData.map((qna, i) => {
                        return (
                            <tr key={qna.id}>
                                <td className="table-no">{i + 1}</td>
                                <td className="table-title" onClick={() => { navigate(`/qna/detail/${qna.id}`, { state: { boardKind: "1" } }) }} >{qna.utitle}</td>
                                <td className="table-date">{qna.createAt2}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            {/* <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                totalItemsCount={boardData.length} // 총 아이템 갯수
                pageRangeDisplayed={5} // paginator의 페이지 범위
                firstPageText={<AiOutlineDoubleLeft />} // "처음"을 나타낼 텍스트
                prevPageText={<AiOutlineLeft />} // "이전"을 나타낼 텍스트
                lastPageText={<AiOutlineDoubleRight />} // "마지막"을 나타낼 텍스트
                nextPageText={<AiOutlineRight />} // "다음"을 나타낼 텍스트
                onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            /> */}
            <div>
                <button onClick={() => { navigate("/qna/input", { state: { boardKind: "2", formKind: "write" } }) }} >글쓰기</button>
            </div>
        </>
    )
}

export default QnaTab