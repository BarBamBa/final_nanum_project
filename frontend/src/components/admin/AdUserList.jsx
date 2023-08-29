import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

function AdUserList({ userData, page, handlePageChange, fetchUsers, getBoardList, blackedOnly, setBlackedOnly, searchUser }) {

  const navigate = useNavigate();

  //-----------페이징-------------
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedUserData = userData.slice(startIndex, endIndex);
  console.log("paginatedUserData", paginatedUserData);
  //-----------페이징-------------

  const [searchKind, setSearchKind] = useState("all"); // 검색 기준
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isOpenBoard, setIsOpenBoard] = useState(false); // 신고리스트 모달창 flg
  const [isOpenReply, setIsOpenReply] = useState(false);

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
      console.log(paginatedUserData.length);
      console.log(checked);
      const checklist = [];

      // 페이징해서 10개씩 잘라진 데이터에서 id를 checkItems state에 모두 담는다.
      // checkitems 에 id가 있는 행에는 체크가 되게 밑에서 조건을 건다
      paginatedUserData.forEach((el) => console.log(el.id));
      paginatedUserData.forEach((el) => checklist.push(el.id));
      setCheckItems(checklist);
    }

    // 반대의 경우 전체 체크 박스 체크 삭제
    else {
      setCheckItems([]);
    }

  };

  //-----------유저 블랙-------------
  async function blackUsers() {
    const jsonList = checkItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
    console.log(jsonList);
    if (!confirm("차단하시겠습니까?")) {
      return;
    }
    await fetch("/api/admin/users/black", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonList),
    })
      .then((res) => res.json())
      .then((data) => {
        setCheckItems([]);
        searchHandle(searchKind, searchKeyword);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //-----------유저 블랙-------------

  //-----------유저 블랙 복구-------------
  async function revertUsers() {
    const jsonList = checkItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
    console.log(jsonList);
    if (!confirm("차단을 푸시겠습니까?")) {
      return;
    }
    await fetch("/api/admin/users/revert", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonList),
    })
      .then((res) => res.json())
      .then((data) => {
        setCheckItems([]);
        searchHandle(searchKind, searchKeyword);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //-----------유저 블랙 복구-------------

  //-----------관리자등록-------------
  async function addAdmin() {
    const jsonList = checkItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
    console.log(jsonList);
    if (!confirm("관리자로 등록 하시겠습니까?")) {
      return;
    }
    await fetch("/api/admin/users/addAdmin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonList),
    })
      .then((res) => res.json())
      .then((data) => {
        setCheckItems([]);
        searchHandle(searchKind, searchKeyword);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //-----------관리자등록-------------

  //-----------관리자해제-------------
  async function removeAdmin() {
    const jsonList = checkItems.map(id => ({ id })); //List 형태를 Json 형태로 변경
    console.log(jsonList);
    if (!confirm("관리자로 등록 하시겠습니까?")) {
      return;
    }
    await fetch("/api/admin/users/removeAdmin", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonList),
    })
      .then((res) => res.json())
      .then((data) => {
        setCheckItems([]);
        searchHandle(searchKind, searchKeyword);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //-----------관리자해제-------------


  console.log("체크된 글 리스트", checkItems);
  console.log("체크된 댓글글 리스트", checkReplyItems);

  //-----------체크박스-------------

  async function searchHandle() {

    searchUser(searchKind, searchKeyword);
    handlePageChange(1);
    console.log("검색기준 : ", searchKind);
    console.log("검색어 : ", searchKeyword);
  }

  return (
    <div className='ad-board'>
      <div className='ad-board-manage-bar'>
        <table className='ad-board-manage-table'>
          <tbody>
            <tr>
              <td>회원검색</td>
              <td>
                <select onChange={(e) => { setSearchKind(e.target.value); }}>
                  <option value="all">검색기준</option>
                  <option value="id">회원번호</option>
                  <option value="name">회원이름</option>
                  <option value="email">이메일</option>
                  <option value="nickname">NICK</option>
                </select>
              </td>
              <td>
                <input type="text" onChange={(e) => { setSearchKeyword(e.target.value) }}></input>
                <button onClick={searchHandle}>검색</button>
              </td>
              <td><button onClick={fetchUsers} >전체보기</button></td>
              {/* <td>블랙유저만 보기</td>
              <td><input type="checkbox" onChange={(e) => { setBlackedOnly(!blackedOnly); searchHandle(); console.log(blackedOnly) }}></input></td> */}
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
                  checkItems.length === paginatedUserData.length
                    ? true
                    : false
                }
              />
            </th>
            <th className="ad-board-head">번호</th>
            <th className="ad-board-head">이름</th>
            <th className="ad-board-head">나이</th>
            <th className="ad-board-head">Email</th>
            <th className="ad-board-head">H.P</th>
            <th className='ad-board-head'>Nick</th>
            <th className='ad-board-head'>회원상태</th>
            <th className='ad-board-head'>회원등급</th>
            <th className="ad-board-head">가입일</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUserData.map((user, i) => {

            return (
              <tr key={user.id}>
                <td className="ad-board-checkbox">
                  <input
                    type='checkbox'
                    onChange={(e) => handleSingleCheck(e.target.checked, user.id)}
                    // checkItems에 id가 있으면 체크 아니면 체크 해제
                    checked={checkItems.includes(user.id) ? true : false}
                  />
                </td>
                <td className="ad-board-item ad-board-id">{user.id}</td>
                <td className="ad-board-item ad-board-name"><span>{user.name}</span></td>
                <td className="ad-board-item ad-board-age"><span>{user.age}</span></td>
                <td className="ad-board-item ad-board-mail">{user.email}</td>
                <td className="ad-board-item ad-board-phone">{user.phone}</td>
                <td className="ad-board-item ad-board-nick">{user.nickname}</td>
                <td className="ad-board-item ad-board-status">{user.status == "Y" ? "활동" : "블랙"}</td>
                <td className="ad-board-item ad-board-date">{user.authority == "ROLE_USER" ? "유저" : "관리자"}</td>
                <td className="ad-board-item ad-board-date">{user.createAt2}</td>
              </tr>
            );
          })}

        </tbody>
      </table>
      <button onClick={blackUsers}>선택차단</button>
      <button onClick={revertUsers}>선택복구</button>
      <button onClick={addAdmin}>관리자등록</button>
      <button onClick={removeAdmin}>관리자해제</button>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={userData.length} // 총 아이템 갯수
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

export default AdUserList