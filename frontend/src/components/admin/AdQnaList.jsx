import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

function AdQnaList({ qnaData, page, handlePageChange, fetchQna, selectCategory }) {

  const navigate = useNavigate();

  //-----------페이징-------------
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedQnaData = qnaData.slice(startIndex, endIndex);
  console.log("paginatedQnaData", paginatedQnaData);
  //-----------페이징-------------

  const [boardCategory, setBoardCategory] = useState("0"); // 게시판 카테고리
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
      console.log(paginatedQnaData.length);
      console.log(checked);
      const checklist = [];

      // 페이징해서 10개씩 잘라진 데이터에서 id를 checkItems state에 모두 담는다.
      // checkitems 에 id가 있는 행에는 체크가 되게 밑에서 조건을 건다
      paginatedQnaData.forEach((el) => console.log(el.id));
      paginatedQnaData.forEach((el) => checklist.push(el.id));
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

  //-----------글 삭제-------------
  async function deleteQna() {
    const jsonList = checkItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
    console.log(jsonList);
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }
    await fetch("/api/admin/qna/delete", {
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
  async function revertQna() {
    const jsonList = checkItems.map(id => ({ id }));
    console.log(jsonList);
    if (!confirm("복구하시겠습니까??")) {
      return;
    }
    await fetch("/api/admin/qna/revert", {
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
  return (
    <div className='ad-board'>
      <div className='ad-board-manage-bar'>
        <table className='ad-board-manage-table'>
          <tbody>
            <tr>
              <td>문의글 선택</td>
              <td>
                <select onChange={(e) => { setBoardCategory(e.target.value), selectCategory(e.target.value, false), setReportOnly(false), handlePageChange(1);setCheckItems([]); }} >
                  <option value="0">전체보기</option>
                  <option value="1">FAQ</option>
                  <option value="2">QnA</option>
                </select>
              </td>
              <td>답변 대기중 문의글만 보기</td>
              <td><input type='checkbox' onChange={(e) => { handlePageChange(1); setReportOnly(!reportOnly); selectCategory(boardCategory, e.target.checked) }} checked={reportOnly ? true : false}></input></td>
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
                onChange={(e) => handleAllCheck(e.target.checked)}
                // checkItems의 갯수와 페이징 된 데이터 갯수가 같을 때 전체 선택
                // 하나라도 빼면 체크 박스 해제
                checked={
                  checkItems.length === paginatedQnaData.length
                    ? true
                    : false
                }
              />
            </th>
            <th className="ad-board-head">번호</th>
            <th className="ad-board-head">제목</th>
            <th className="ad-board-head">작성자ID</th>
            <th className="ad-board-head">Nick</th>
            <th className='ad-board-head'>문의글 종류</th>
            <th className='ad-board-head'>문의글 상태</th>
            <th className="ad-board-head">등록일</th>
            <th className="ad-board-head">답변여부</th>
          </tr>
        </thead>
        <tbody>
          {paginatedQnaData.map((qna, i) => {

            return (
              <tr key={qna.id}>
                <td className="ad-qna-checkbox">
                  <input
                    type='checkbox'
                    onChange={(e) => handleSingleCheck(e.target.checked, qna.id)}
                    // checkItems에 id가 있으면 체크 아니면 체크 해제
                    checked={checkItems.includes(qna.id) ? true : false}
                  />
                </td>
                <td className="ad-board-item ad-qna-id">{qna.id}</td>
                <td className="ad-board-item ad-qna-title"><span onClick={() => { navigate(`/qna/detail/${qna.id}`) }}>{qna.title}</span></td>
                <td className="ad-board-item ad-qna-userId">{qna.userId}</td>
                <td className="ad-board-item ad-qna-nickname">{qna.nickname}</td>
                <td className="ad-board-item ad-qna-flg">{qna.flg == "1" ? "FAQ" : "QnA"}</td>
                <td className="ad-board-item ad-qna-status">{qna.status == "Y" ? "게시" : "삭제"}</td>
                <td className="ad-board-item ad-qna-date">{qna.createAt2}</td>
                <td className="ad-board-item ad-qna-replyYn">{qna.answers.length == 0 ? "N" : "Y"}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
      <div className='ad-board-btn-box'>
        <button onClick={deleteQna}>선택삭제</button>
        <button onClick={revertQna}>선택복구</button>
      </div>

      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={qnaData.length} // 총 아이템 갯수
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

export default AdQnaList