import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

function AdBoardList({ boardData, reportData, page, handlePageChange, fetchBoards, selectCategory, reportedBoard }) {
    const navigate = useNavigate();
    //-----------페이징-------------
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedBoardData = boardData.slice(startIndex, endIndex);
    //-----------페이징-------------

    const [boardCategory, setBoardCategory] = useState(0); // 게시판 카테고리
    const [reportedFlg, setReportedFlg] = useState(false); // 신고 게시판 flg
    const [isOpen, setIsOpen] = useState(false); // 신고리스트 모달창 flg

    //-----------체크박스-------------
    const [checkItems, setCheckItems] = useState([]); //체크박스에 담은 리스트

    useEffect(() => { //페이지 바뀌면 체크한 리스트 초기화
        setCheckItems([]);
        console.log("페이지바뀜", checkItems);
    }, [page]);

    const handleSingleCheck = (checked, id) => { // 하나씩 체크기능
        console.log("체크 여부", checked, id);
        if (checked) {
            setCheckItems([...checkItems, id]);
        } else {
            // 체크 해제
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    const handleAllCheck = (checked) => { //모두 체크 기능
        if (checked) {
            console.log(paginatedBoardData.length);
            console.log(checked);
            const checklist = [];

            // 페이징해서 10개씩 잘라진 데이터에서 id를 checkItems state에 모두 담는다.
            // checkitems 에 id가 있는 행에는 체크가 되게 밑에서 조건을 건다
            paginatedBoardData.forEach((el) => console.log(el.id));
            paginatedBoardData.forEach((el) => checklist.push(el.id));
            setCheckItems(checklist);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }
    };

    console.log("체크된 글 리스트", checkItems);
    //-----------체크박스-------------


    //-----------글 삭제-------------
    async function deleteBoard() {
        const jsonList = checkItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
        console.log(jsonList);
        if (!confirm("삭제하시겠습니까?")) {
            return;
        }
        await fetch("/api/admin/boards/delete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonList),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCheckItems([]);
                setBoardCategory(boardCategory);
                selectCategory(boardCategory);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //-----------글 삭제-------------

    //-----------글 복구-------------
    async function revertBoard() {
        const jsonList = checkItems.map(id => ({ id }));
        console.log(jsonList);
        if (!confirm("복구하시겠습니까??")) {
            return;
        }
        await fetch("/api/admin/boards/revert", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonList),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCheckItems([]);
                setBoardCategory(boardCategory);
                selectCategory(boardCategory);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //-----------글 복구-------------
    return (
        <div className='ad-board'>
            <div className='ad-board-manage-bar'>
                <table className='ad-board-manage-table'>
                    <tbody>
                        <tr>
                            <td>게시판 선택</td>
                            <td>
                                <select onChange={(e) => { selectCategory(e.target.value), setBoardCategory(e.target.value) }} value={boardCategory}>
                                    <option value={0}>전체보기</option>
                                    <option value={1}>공지사항</option>
                                    <option value={2}>소식공유</option>
                                    <option value={3}>자유게시판</option>
                                    <option value={4}>봉사후기</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <table className='ad-board-table'>
                <thead>
                    <tr>
                        <th className="ad-board-head">
                            <input
                                type='checkbox'
                                onChange={(e) => handleAllCheck(e.target.checked)}
                                // checkItems의 갯수와 페이징 된 데이터 갯수가 같을 때 전체 선택                           
                                // 하나라도 빼면 체크 박스 해제
                                checked={
                                    checkItems.length === paginatedBoardData.length
                                        ? true
                                        : false
                                }
                            />
                        </th>
                        <th className="ad-board-head">번호</th>
                        <th className="ad-board-head">제목</th>
                        <th className="ad-board-head">작성자ID</th>
                        <th className='ad-board-head'>Nick</th>
                        <th className='ad-board-head'>게시판 종류</th>
                        <th className='ad-board-head'>게시판 상태</th>
                        <th className="ad-board-head">등록일</th>
                        <th className="ad-board-head">신고</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBoardData.map((board, i) => {

                        return (
                            <tr key={board.id}>
                                <td className="ad-board-checkbox">
                                    <input
                                        type='checkbox'
                                        onChange={(e) => handleSingleCheck(e.target.checked, board.id)}
                                        // checkItems에 id가 있으면 체크 아니면 체크 해제
                                        checked={checkItems.includes(board.id) ? true : false}
                                    />
                                </td>
                                <td className="ad-board-item ad-board-id">{board.id}</td>
                                <td className="ad-board-item ad-board-title" onClick={() => { navigate(`/board/detail/${board.id}`) }}>{board.title}</td>
                                <td className="ad-board-item ad-board-nick">{board.userId}</td>
                                <td className="ad-board-item ad-board-nick">{board.nick}</td>
                                <td className="ad-board-item ad-board-nick">
                                    {board.flg === "1"
                                        ? "공지사항"
                                        : board.flg === "2"
                                            ? "소식공유"
                                            : board.flg === "3"
                                                ? "자유게시판"
                                                : board.flg === "4"
                                                    ? "봉사후기"
                                                    : ""
                                    }</td>
                                <td className="ad-board-item ad-board-nick">{board.status === "Y" ? "게시" : "삭제"}</td>
                                <td className="ad-board-item ad-board-date">{board.createAt}</td>
                                <td className="ad-board-item ad-board-date" style={board.reportYn == "Y" ? { color: "red" } : null} ><span onClick={() => { setIsOpen(true), reportedBoard(board.id) }}>{board.reportYn}</span></td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <button onClick={deleteBoard}>선택삭제</button>
            <button onClick={revertBoard}>선택복구</button>
            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                totalItemsCount={boardData.length} // 총 아이템 갯수
                pageRangeDisplayed={5} // paginator의 페이지 범위
                firstPageText="<<" // "처음"을 나타낼 텍스트
                prevPageText="<" // "이전"을 나타낼 텍스트
                lastPageText=">" // "마지막"을 나타낼 텍스트
                nextPageText=">>" // "다음"을 나타낼 텍스트
                onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />

            {/* 신고사유 모달창 */}
            <Modal
                style={modalStyle}
                isOpen={isOpen}
                onRequestClose={() => { setIsOpen(false) }}
            >
                {reportData.length == 0 ? <span>신고내역이없습니다.</span> :
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>사유</th>
                                    <th>게시판번호</th>
                                    <th>게시자ID</th>
                                    <th>신고자ID</th>
                                    <th>신고일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((data, i) => {
                                    console.log(data.length);
                                    return (

                                        <tr key={data.id}>
                                            <td>{data.id}</td>
                                            <td>{data.reason == 1
                                                ? "폭력"
                                                : data.reason == 2
                                                    ? "광고"
                                                    : data.reason == 3
                                                        ? "선정성"
                                                        : data.reason == 4
                                                            ? "게시판성격과 무관"
                                                            : ""}</td>
                                            <td>{data.boardId}</td>
                                            <td>{data.reportedId}</td>
                                            <td>{data.reporterId}</td>
                                            <td>{data.createAt2}</td>
                                        </tr>
                                    )
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                }

            </Modal>
        </div>
    )
}
const modalStyle = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    content: {
        width: "1200px",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        top: "42vh",
        left: "38vw",
        right: "38vw",
        bottom: "42vh",
        WebkitOverflowScrolling: "touch",
        borderRadius: "14px",
        outline: "none",
        zIndex: 10,
    },
};

export default AdBoardList