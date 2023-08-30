import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import AdUserList from '../../components/admin/AdUserList';
import '/src/scss/admin/AdUser.scss'

function AdUser() {

  const [userData, setUserData] = useState([]);
  const [blackedOnly, setBlackedOnly] = useState(false);
  const [boardData, setBoardData] = useState([]);

  //-----------페이징-------------
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  //-----------페이징-------------

  // 유저리스트 조회
  async function fetchUsers() {
    await fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("userData", data);

        setUserData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //검색어로 조회
  async function searchUser(searchKind, searchKeyword) {
    let data;
    console.log("검색어와 키워드 : ", searchKind, searchKeyword);
    if (searchKind == "all") {
      data = { name: searchKeyword }
    }
    if (searchKind == "id") {
      data = { id: searchKeyword }
    }
    if (searchKind == "name") {
      data = { name: searchKeyword }
    }
    if (searchKind == "email") {
      data = { email: searchKeyword }
    }
    if (searchKind == "nickname") {
      data = { nickname: searchKeyword }
    }
    await fetch("/api/admin/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length == 0) {
          alert("검색결과가없습니다.");
          return
        }
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='ad-container'>
      <h1>회원 리스트</h1>
      <AdUserList
        userData={userData}
        setBlackedOnly={setBlackedOnly}
        blackedOnly={blackedOnly}
        page={page}
        handlePageChange={handlePageChange}
        fetchUsers={fetchUsers}
        searchUser={searchUser}
      // getBoardList={getBoardList}
      />
    </div>
  )
}

export default AdUser