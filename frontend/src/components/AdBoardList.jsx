import React from 'react'
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

function AdBoardList({ boardData, page, handlePageChange }) {
    //-----------페이징-------------
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedBoardData = boardData.slice(startIndex, endIndex);
    //-----------페이징-------------

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
        const jsonList = checkItems.map(id => ({id}));
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
            })
            .catch((error) => {
                console.log(error);
            });
    }
    //-----------글 삭제-------------
    return (
        <div className='ad-board'>
            <div className='ad-board-manage-bar'>
                <table className='ad-board-manage-table'>
                    <tbody>
                        <tr>
                            <td>게시판 선택</td>
                            <td>
                                <select>
                                    <option>공지사항</option>
                                    <option>소식공유</option>
                                    <option>자유게시판</option>
                                    <option>봉사후기</option>
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
                        <th className="ad-board-head">등록일</th>
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
                                <td className="ad-board-item ad-board-nick">{board.flg}</td>
                                <td className="ad-board-item ad-board-date">{board.createAt}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <button onClick={deleteBoard}>선택삭제</button>
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
        </div>
    )
}

export default AdBoardList