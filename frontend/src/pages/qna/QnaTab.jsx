import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { TokenCheck } from "../../components/TokenCheck";

import {
    AiOutlineLeft,
    AiOutlineDoubleLeft,
    AiOutlineRight,
    AiOutlineDoubleRight,
} from "react-icons/ai";
import { BsSearch } from 'react-icons/bs'

function QnaTab({ qnaData, searchQna, qnaKind }) {
    const navigate = useNavigate();

    const userInfo = useContext(TokenCheck);
    console.log(userInfo.userId);
    console.log(userInfo.auth);

    const [keyword, setKeyword] = useState(); //검색어

    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedBoardData = qnaData.slice(startIndex, endIndex);
    const handlePageChange = (page) => {
        setPage(page);
    };

    const toDetail = (id) => { // 상세페이지로 이동
        navigate(`/qna/detail/${id}`, { state: { boardKind: "2" } })
    }

    const handleSearchQna = () => {
        console.log(keyword);
        searchQna(keyword);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchQna();
        }
    };

    const handleWrite = () => {
        if (userInfo.userId == null) {
            alert("로그인 이후 이용 가능한 기능입니다.");
            return;
        }
        navigate("/qna/input", {
            state: { boardKind: "2", formKind: "write" }
        })
    }

    return (
        <>
            <div className="search-box">
                <input placeholder="검색어를 입력해주세요" type="text" onChange={(e) => { setKeyword(e.target.value); console.log(keyword); }} onKeyPress={handleKeyPress}></input>
                <button onClick={handleSearchQna} id="searchBtn">검색</button>
                <label htmlFor="searchBtn" className="searchBtn"><BsSearch className="searchIcon" /></label>
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
                    {paginatedBoardData.map((qna, i) => {
                        return (
                            <tr key={qna.id}>
                                <td className="table-no">{i + 1}</td>
                                <td className="table-title" ><span onClick={() => toDetail(qna.id)} >{qna.title}</span></td>
                                <td className="table-date">{qna.createAt2}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                totalItemsCount={qnaData.length} // 총 아이템 갯수
                pageRangeDisplayed={5} // paginator의 페이지 범위
                firstPageText={<AiOutlineDoubleLeft />} // "처음"을 나타낼 텍스트
                prevPageText={<AiOutlineLeft />} // "이전"을 나타낼 텍스트
                lastPageText={<AiOutlineDoubleRight />} // "마지막"을 나타낼 텍스트
                nextPageText={<AiOutlineRight />} // "다음"을 나타낼 텍스트
                onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />
            <div className="qna-write-btn">
                <button onClick={handleWrite} >글쓰기</button>
            </div>
        </>
    )
}

export default QnaTab