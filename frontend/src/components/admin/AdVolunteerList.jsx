import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

function AdVolunteerList({ volData, page, handlePageChange, fetchVolunteer, selectCategory }) {

    const navigate = useNavigate();

    //-----------페이징-------------
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedVolData = volData.slice(startIndex, endIndex);
    console.log("paginatedVolData", paginatedVolData);
    //-----------페이징-------------

    const [boardCategory, setBoardCategory] = useState("A"); // 게시판 카테고리
    const [reportOnly, setReportOnly] = useState(false);

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
            console.log(paginatedVolData.length);
            console.log(checked);
            const checklist = [];

            // 페이징해서 10개씩 잘라진 데이터에서 id를 checkItems state에 모두 담는다.
            // checkitems 에 id가 있는 행에는 체크가 되게 밑에서 조건을 건다
            paginatedVolData.forEach((el) => console.log(el.id));
            paginatedVolData.forEach((el) => checklist.push(el.id));
            setCheckItems(checklist);
        }

        // 반대의 경우 전체 체크 박스 체크 삭제
        else {
            setCheckItems([]);
        }

    };

    console.log("체크된 글 리스트", checkItems);
    console.log("체크된 댓글글 리스트", checkReplyItems);

    //-----------체크박스-------------

    //-----------봉사활동 승인 상태 변경-------------
    async function permitApplicants(kind) {
        console.log(kind);
        const jsonList = checkItems.map(id => ({ id }));
        console.log(jsonList);
        let endpoint;
        if (kind == "Y") {
            if (!confirm("신청을 승인하시겠습니까?")) {
                return;
            }
            endpoint = "permit";
        }
        if (kind == "N") {
            if (!confirm("신청을 거부하시겠습니까?")) {
                return;
            }
            endpoint = "deny";
        }
        if (kind == "R") {
            if (!confirm("신청 대기중으로 되돌리시겠습니까?")) {
                return;
            }
            endpoint = "wait";
        }
        if (kind == "F") {
            if (!confirm("봉사를 완료시겠습니까?")) {
                return;
            }
            endpoint = "finish";
        }
        await fetch(`/api/admin/volunteer/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonList),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log("tata",boardCategory);
                selectCategory(boardCategory);
                // fetchVolunteer();
                setCheckItems([]);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    //-----------댓글 복구-------------

    function formatDate(dateStr) {
        return dateStr.slice(0, 10); // "LocalDateTime" 으로 온 날짜를 "YYYY-MM-DD" 형태로 포맷팅
    }

    return (
        paginatedVolData &&
        <div className='ad-board'>
            <div className='ad-board-manage-bar'>
                <table className='ad-board-manage-table'>
                    <tbody>
                        <tr>
                            <td>게시판 선택</td>
                            <td>
                                <select onChange={(e) => { setBoardCategory(e.target.value); selectCategory(e.target.value); handlePageChange(1); setCheckItems([]); }} value={boardCategory}>
                                    <option value="A">전체보기</option>
                                    <option value="R">승인대기</option>
                                    <option value="Y">승인</option>
                                    <option value="N">거부</option>
                                    <option value="C">취소</option>
                                </select>
                            </td>
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
                                onChange={(e) => { handleAllCheck(e.target.checked); }}
                                // checkItems의 갯수와 페이징 된 데이터 갯수가 같을 때 전체 선택
                                // 하나라도 빼면 체크 박스 해제
                                checked={
                                    checkItems.length === paginatedVolData.length
                                        ? true
                                        : false
                                }
                            />
                        </th>
                        <th className="ad-board-head">신청번호</th>
                        <th className="ad-board-head">봉사번호</th>
                        <th className="ad-board-head">봉사활동</th>
                        <th className="ad-board-head">ID</th>
                        <th className='ad-board-head'>이름</th>
                        <th className='ad-board-head'>봉사날짜</th>
                        <th className="ad-board-head">신청등록일</th>
                        <th className="ad-board-head">신청상태</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedVolData.map((vol, i) => {

                        return (
                            <tr key={vol.id}>
                                <td className="ad-vol-checkbox">
                                    <input
                                        type='checkbox'
                                        onChange={(e) => handleSingleCheck(e.target.checked, vol.id)}
                                        // checkItems에 id가 있으면 체크 아니면 체크 해제
                                        checked={checkItems.includes(vol.id) ? true : false}
                                    />
                                </td>
                                <td className="ad-board-item ad-vol-id">{vol.id}</td>
                                <td className="ad-board-item ad-vol-volId">{vol.volunteerId}</td>
                                <td className="ad-board-item ad-vol-title"><span onClick={() => { navigate(`/vdetail/${vol.volunteerCode}`, { state: { progrmRegistNo: vol.volunteerCode } }) }}>{vol.volunteerTitle}</span></td>
                                <td className="ad-board-item ad-vol-userId">{vol.userId}</td>
                                <td className="ad-board-item ad-vol-name">{vol.userName}</td>
                                <td className="ad-board-item ad-vol-selectDate">{formatDate(vol.selectedDay)}</td>
                                <td className="ad-board-item ad-vol-date">{formatDate(vol.createAt)}</td>
                                <td className="ad-board-item ad-vol-status">{vol.status == "Y" ? "승인" : vol.status == "N" ? "거부" : vol.status == "R" ?"승인대기": vol.status == "F" ? "완료":null}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <div className='ad-board-btn-box'>
                <button onClick={() => { permitApplicants("Y") }}>선택승인</button>
                <button onClick={() => { permitApplicants("N") }}>선택거부</button>
                <button onClick={() => { permitApplicants("R") }}>선택승인대기</button>
                <button onClick={() => { permitApplicants("F") }}>봉사완료</button>
            </div>

            <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
                totalItemsCount={volData.length} // 총 아이템 갯수
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

export default AdVolunteerList