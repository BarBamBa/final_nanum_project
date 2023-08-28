import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

function AdQnaList({qnaData, page, handlePageChange, fetchQna}) {

    const navigate = useNavigate();

    //-----------페이징-------------
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedUserData = qnaData.slice(startIndex, endIndex);
    console.log("paginatedUserData", paginatedUserData);
    //-----------페이징-------------

    const [boardCategory, setBoardCategory] = useState("0"); // 게시판 카테고리
    const [reportOnly, setReportOnly] = useState(false);
    const [isOpenReport, setIsOpenReport] = useState(false); // 신고리스트 모달창 flg
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
    return (
        <div className='ad-board'>
            <div className='ad-board-manage-bar'>
                <table className='ad-board-manage-table'>
                    <tbody>
                        <tr>
                            <td>게시판 선택</td>
                            <td>
                                <select>
                                    <option>검색기준</option>
                                    <option value={1}>회원번호</option>
                                    <option value={2}>회원이름</option>
                                    <option value={3}>이메일</option>
                                    <option value={4}>NICK</option>
                                </select>
                            </td>
                            <td>
                                <input></input>
                                <button>검색</button>
                            </td>
                            <td>신고된 유저만 보기</td>
                            <td><input type='checkbox'></input></td>
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
                        <th className="ad-board-head">Email</th>
                        <th className="ad-board-head">H.P</th>
                        <th className='ad-board-head'>Nick</th>
                        <th className='ad-board-head'>게시글</th>
                        <th className='ad-board-head'>게시댓글</th>
                        <th className='ad-board-head'>회원상태</th>
                        <th className="ad-board-head">가입일</th>
                        <th className="ad-board-head">신고</th>
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
                                <td className="ad-board-item ad-board-name" onClick={() => { navigate(`/board/detail/${user.id}`) }}><span>{user.name}</span></td>
                                <td className="ad-board-item ad-board-mail">{user.email}</td>
                                <td className="ad-board-item ad-board-phone">{user.phone}</td>
                                <td className="ad-board-item ad-board-nick">{user.nickname}</td>
                                <td className="ad-board-item ad-board-boards">게시글수</td>
                                <td className="ad-board-item ad-board-replies">게시댓글수</td>
                                <td className="ad-board-item ad-board-status">{user.status}</td>
                                <td className="ad-board-item ad-board-date">{user.createAt2}</td>
                                <td className="ad-board-item ad-board-date">{user.createAt2}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            <button onClick="">선택차단</button>
            <button onClick="">선택복구</button>
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

            {/* 신고사유 모달창 */}
            {/* <Modal
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

      </Modal> */}

            {/* 댓글리스트 모달창 */}
            {/* <Modal
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
                      <td>{reply.createAt2}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <button onClick="" >선택삭제</button>
            <button onClick="" >선택복구</button>
          </div>
        }
      </Modal> */}
        </div>
    )
}

export default AdQnaList