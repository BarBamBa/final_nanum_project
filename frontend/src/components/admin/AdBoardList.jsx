import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

function AdBoardList({ boardData, reportData, page, handlePageChange, fetchBoards, selectCategory, reportedBoard, reportViewHandle }) {

    const navigate = useNavigate();

    //-----------페이징-------------
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedBoardData = boardData.slice(startIndex, endIndex);
    console.log("paginatedBoardData", paginatedBoardData);
    //-----------페이징-------------

    const [boardCategory, setBoardCategory] = useState("0"); // 게시판 카테고리
    const [reportOnly, setReportOnly] = useState(false);
    const [isOpenReport, setIsOpenReport] = useState(false); // 신고리스트 모달창 flg
    const [isOpenReply, setIsOpenReply] = useState(false);
    console.log(boardCategory);
    
    //-----------체크박스-------------
    const [checkItems, setCheckItems] = useState([]); //체크박스에 담은 게시판 리스트
    const [checkReplyItems, setCheckReplyItems] = useState([]);  //체크박스에 담은 댓글 리스트

    useEffect(() => { //페이지 바뀌면 체크한 리스트 초기화
        setCheckItems([]);
        console.log("페이지바뀜", checkItems);
    }, [page]);

    const handleSingleCheck = (checked, id) => { // 하나씩 체크기능
        console.log("게시판 체크 여부", checked, id);
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

    const handleSingleCheckReply = (checked, id) => {
        console.log("댓글 체크 여부", checked, id);
        if (checked) {
            setCheckReplyItems([...checkReplyItems, id]);
        } else {
            setCheckReplyItems(checkReplyItems.filter((el) => el !== id));
        }
    };

    const handleAllCheckReply = (checked) => { //모두 체크 기능
        if (checked) {
            console.log(replyData.length);
            console.log(checked);
            const checklist = [];

            // 페이징해서 10개씩 잘라진 데이터에서 id를 checkItems state에 모두 담는다.
            // checkitems 에 id가 있는 행에는 체크가 되게 밑에서 조건을 건다
            replyData.forEach((el) => console.log(el.id));
            replyData.forEach((el) => checklist.push(el.id));
            setCheckReplyItems(checklist);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckReplyItems([]);
        }
    };
    console.log("체크된 글 리스트", checkItems);
    console.log("체크된 댓글글 리스트", checkReplyItems);

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
                console.log("ddddd", data);
                setCheckItems([]);
                setBoardCategory(boardCategory);
                setReportOnly(false);
                selectCategory(boardCategory);
                console.log("boardCategory", boardCategory);
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
                setReportOnly(false);
                selectCategory(boardCategory);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //-----------글 복구-------------

    //-----------댓글 삭제-------------
    async function deleteReply() {
        const jsonList = checkReplyItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
        console.log(jsonList);
        if (!confirm("삭제하시겠습니까?")) {
            return;
        }
        await fetch("/api/admin/reply/delete", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonList),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                selectCategory(boardCategory);
                setCheckReplyItems([]);
                setReportOnly(false);
                setIsOpenReply(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    //-----------댓글 삭제-------------

    //-----------댓글 복구-------------
    async function revertReply() {
        const jsonList = checkReplyItems.map(id => ({ id }));
        console.log(jsonList);
        if (!confirm("복구하시겠습니까??")) {
            return;
        }
        await fetch("/api/admin/reply/revert", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonList),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                selectCategory(boardCategory);
                setCheckReplyItems([]);
                setReportOnly(false);
                setIsOpenReply(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    //-----------댓글 복구-------------


    //-----------모달창용 댓글목록 불러오기-------------
    const [replyData, setReplyData] = useState([]);
    const getReplies = (replies) => { //댓글수를 클릭하면 해당 게시판의 댓글들을 setReplyData로 담는다
        console.log("re",replies);
        setReplyData(replies);
    }
    //-----------모달창용 댓글목록 불러오기-------------

    function formatDate(dateStr) {
        return dateStr.slice(0, 10); // "LocalDateTime" 으로 온 날짜를 "YYYY-MM-DD" 형태로 포맷팅
    }

    return (
        <div className='ad-board'>
            <div className='ad-board-manage-bar'>
                <table className='ad-board-manage-table'>
                    <tbody>
                    <tr>
                        <td>게시판 선택</td>
                        <td>
                            <select onChange={(e) => { setBoardCategory(e.target.value), selectCategory(e.target.value, false), setReportOnly(false) ,handlePageChange(1) }} value={boardCategory}>
                                <option value="0">전체보기</option>
                                <option value="1">공지사항</option>
                                <option value="2">소식공유</option>
                                <option value="3">자유게시판</option>
                                <option value="4">봉사후기</option>
                            </select>
                        </td>
                        {/* <td><button onClick={() => {reportViewHandle();}}>신고된 글만 보기</button></td> */}
                        <td>신고된 게시글만 보기</td>
                        <td><input type='checkbox' onChange={(e) => {handlePageChange(1); setReportOnly(!reportOnly); selectCategory(boardCategory, e.target.checked)}} checked={reportOnly ? true : false}></input></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <table className='ad-board-table'>
                <thead>
                <tr>
                    <th className="ad-board-head ad-board-head-checkbox">
                        <input
                            type='checkbox'
                            onChange={(e) =>{ handleAllCheck(e.target.checked);}}
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
                    <th className='ad-board-head'>댓글수</th>
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
                            <td className="ad-board-item ad-board-title" onClick={() => { navigate(`/board/detail/${board.id}`) }}><span>{board.title}</span></td>
                            <td className="ad-board-item ad-board-userId">{board.userId}</td>
                            <td className="ad-board-item ad-board-nick">{board.nick}</td>
                            <td className="ad-board-item ad-board-category">
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
                            <td className="ad-board-item ad-board-replyCount"><span onClick={() => { selectCategory(boardCategory), getReplies(board.replies), setIsOpenReply(true) }} >{board.replies.length}</span></td>
                            <td className="ad-board-item ad-board-status">{board.status === "Y" ? "게시" : "삭제"}</td>
                            <td className="ad-board-item ad-board-date">{board.createAt2}</td>
                            <td className="ad-board-item ad-board-reportYn" style={board.reportYn == "Y" ? { color: "red" } : null} ><span onClick={() => { setIsOpenReport(true), reportedBoard(board.id) }}>{board.reportYn}</span></td>
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
                isOpen={isOpenReport}
                onRequestClose={() => { setIsOpenReport(false) }}
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

            {/* 댓글리스트 모달창 */}
            <Modal
                style={modalStyle}
                isOpen={isOpenReply}
                onRequestClose={() => { setIsOpenReply(false), setCheckReplyItems([]) }}
            >
                {replyData.length == 0 ? <span>댓글이 없습니다</span> :
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>
                                    <input
                                        type='checkbox'
                                        onChange={(e) => { handleAllCheckReply(e.target.checked) }}
                                        // checkItems의 갯수와 페이징 된 데이터 갯수가 같을 때 전체 선택
                                        // 하나라도 빼면 체크 박스 해제
                                        checked={
                                            checkReplyItems.length === replyData.length
                                                ? true
                                                : false
                                        }
                                    />
                                </th>
                                <th>번호</th>
                                <th>내용</th>
                                <th>작성자ID</th>
                                <th>댓글상태</th>
                                <th>댓글종류</th>
                                <th>등록일</th>
                            </tr>
                            </thead>

                            <tbody>
                            {replyData.map((reply, i) => {
                                return (
                                    <tr key={reply.id}>
                                        <td>
                                            <input
                                                type='checkbox'
                                                onChange={(e) => handleSingleCheckReply(e.target.checked, reply.id)}
                                                // checkItems에 id가 있으면 체크 아니면 체크 해제
                                                checked={checkReplyItems.includes(reply.id) ? true : false}
                                            />
                                        </td>
                                        <td>{reply.id}</td>
                                        <td>{reply.content}</td>
                                        <td>{reply.users.id}</td>
                                        <td>{reply.status == "Y"
                                            ? "게시"
                                            : reply.status == "N"
                                                ? "삭제"
                                                : ""}</td>
                                        <td>{reply.reply == null ? "댓글" : `대댓글(${reply.reply.id})`}</td>
                                        <td>{formatDate(reply.createAt)}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <button onClick={deleteReply} >선택삭제</button>
                        <button onClick={revertReply} >선택복구</button>
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
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        top: "30vh",
        left: "25vw",
        right: "38vw",
        bottom: "42vh",
        WebkitOverflowScrolling: "touch",
        borderRadius: "14px",
        outline: "none",
        zIndex: 10,
    },
};

export default AdBoardList