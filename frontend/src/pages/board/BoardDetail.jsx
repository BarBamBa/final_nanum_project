import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TokenCheck } from "../../components/TokenCheck";
import Modal from "react-modal";
import ReviewInfo from "../../components/ReviewInfo";
import { BiX } from "react-icons/bi";
import { PiSiren } from 'react-icons/pi'
import { LuFlower } from 'react-icons/lu'
import { MdSubdirectoryArrowRight } from 'react-icons/md'
import { BsPersonCircle } from 'react-icons/bs'

function BoardDetail() {
  const host = import.meta.env.VITE_API_GATEWAY_HOST;
  const userInfo = useContext(TokenCheck);
  console.log(userInfo.userId);
  console.log(userInfo.auth);

  let { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // 신고 모달창 flg
  const [reportReason, setReportReason] = useState(1); // 신고 사유 value

  const [boardData, setBoardData] = useState({}); //게시글 정보
  const [replyData, setReplyData] = useState([]); //댓글 리스트
  const [childReplyData, setChildReplyData] = useState([]); //대댓글 리스트

  const [newReplyData, setNewReplyData] = useState({}); //댓글작성용데이터
  const [editReplyContent, setEditReplyContent] = useState(); //댓글수정용데이터
  const [newChildReplyData, setNewChildReplyData] = useState({}); //대댓글작성용데이터

  const [postReplyFlg, setPostReplyFlg] = useState(false); //댓글입력창 flg
  const [editReplyFlg, setEditReplyFlg] = useState(false); //댓글수정창 flg

  const [viewChildReplyFlg, setViewChildReplyFlg] = useState(false); //대댓글보기 flg
  const [postChildReplyFlg, setChildReplyFlg] = useState(false); //대댓글입력창 flg
  const [editChildReplyFlg, setEditChildReplyFlg] = useState(false); //대댓글수정창flg

  const [replyIdx, setReplyIdx] = useState(0); //댓글 번호
  const [childReplyIdx, setChildReplyIdx] = useState(0); //대댓글 번호

  const BoardFlg = (index) => {
    switch (index) {
      case "1":
        return "공지사항";
      case "2":
        return "소식공유";
      case "3":
        return "자유게시판";
      case "4":
        return "봉사후기";
      default:
        return "알 수 없음";
    }
  };
  // 게시글 조회
  async function fetchBoards() {
    fetch("/api/boards/" + id)
      .then((response) => response.json())
      .then((data) => {
        setBoardData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // 댓글 조회
  async function fetchReplies() {
    fetch("/api/replies/" + id)
      .then((response) => response.json())
      .then((data) => {
        setReplyData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchBoards();
    fetchReplies();
  }, []);
  // 대댓글 조회
  const fetchChildReplies = async (parentId) => {

    fetch("/api/child-replies/" + parentId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChildReplyData(data)
      })
      .catch((error) => {
        console.error(error);
      })
    console.log(parentId);
    console.log(replyIdx);
    console.log(childReplyIdx);
  }


  // 게시글 삭제
  const removeBoard = async () => {
    if (!confirm("삭제하시겠습니까?")) {
      return;
    }
    fetch(`/api/boards/delete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "N" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/board",{state : {boardKind: boardData.flg}})
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // 댓글 / 대댓글입력
  const newReplyHandle = async () => {
    let data;
    if (postReplyFlg) {
      if (newReplyData == null) {
        alert("댓글을 입력해주세요");
        return;
      }
      if (!confirm("저장하시겠습니까?")) {
        return;
      }
      data = {
        content: newReplyData,
        userId: userInfo.userId,
      }
    } else {
      if (newChildReplyData == null) {
        alert("댓글을 입력해주세요");
        return;
      }
      if (!confirm("저장하시겠습니까?")) {
        return;
      }
      data = {
        content: newChildReplyData.content,
        userId: userInfo.userId,
        parentNo: newChildReplyData.reply //부모댓글 번호
      };
    }
    console.log(data);
    fetch(`/api/replies/post/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("댓글입력완료", res);
        setNewReplyData(); // 새 댓글데이터 초기화
        setNewChildReplyData(); // 새 대댓글데이터 초기화
        setPostReplyFlg(false); // 댓글 입력창 닫기
        setChildReplyFlg(false); // 대댓글 입력창 닫기
        fetchReplies();
        if (viewChildReplyFlg) {
          fetchChildReplies(newChildReplyData.reply);
          // 대댓글 창이 열려있으면 새 대댓글의 parentID로 대댓글 목록 갱신
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 댓글 수정
  const modifyReplyHandle = async (i) => {
    // console.log(editReplyFlg);
    // console.log(editedReplyIndex);
    // console.log(editDeleteFlg);

    if (editReplyContent == "") {
      setEditReplyFlg(false);
      setEditChildReplyFlg(false);
      // setReplyIdx(0);
      alert("수정완료");
      return;
    }
    let data = {
      content: editReplyContent,
      status: "Y"
    }

    if (!confirm("수정하시겠습니까?")) {
      setEditReplyFlg(false);
      setEditChildReplyFlg(false);
      // setReplyIdx(0);
      return;
    }

    fetch(`/api/replies/update/${i}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEditReplyFlg(false);
        setEditChildReplyFlg(false);
        // setReplyIdx(0);
        setEditReplyContent("");
        fetchReplies();
        fetchChildReplies(childReplyData[0].reply);//부모댓글id로 대댓글 fetch해서 대댓글 바로렌더링
        alert("수정완료");
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // 댓글 삭제
  const removeReplyHandle = async (i) => {
    // console.log(editReplyFlg);
    // console.log(editedReplyIndex);
    // console.log(editDeleteFlg);

    let data = {
      status: "N"
    }
    if (!confirm("삭제하시겠습니까?")) {
      setEditReplyFlg(false);
      setEditChildReplyFlg(false);
      return;
    }

    fetch(`/api/replies/update/${i}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        // setEditReplyFlg(false);
        // setEditChildReplyFlg(false);
        fetchReplies();
        fetchChildReplies(childReplyData[0].reply);//부모댓글id로 대댓글 fetch해서 대댓글 바로렌더링
        alert("삭제완료");
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // 게시글 신고
  const reportBoard = async () => {
    let data = {
      reporter: userInfo.userId,
      users: boardData.userId,
      reason: reportReason
    }
    fetch(`/api/report/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data == true) {
          alert("이미 신고한 게시글 입니다.");
          setIsOpen(false);
          return;
        }
        alert("신고되었습니다.");
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
        console.error(error);
      });
  }
  // console.log(process.env.VITE_API_GATEWAY_HOST);

  return (
    boardData && (
      <div className="board-detail-container">
        {/* 게시글 영역 */}
        <div className="board-detail-kind">
          <h1>{BoardFlg(boardData.flg)}</h1>
        </div>
        <div className="backBtnBox">
          <Link to=
            {"/board"} onClick={() => {navigate(-1, {boardKind: boardData.flg})}}>
            목록으로
          </Link>
        </div>
        <div className="board-detail-box">
          <div className="board-detail-header">
            <div className="board-title">
              <h2>{boardData.title}</h2>
            </div>
            
            <div className="board-detail-info">
              <div className="board-writter-date">
                {
                  boardData.flg == "3" || boardData.flg == "4" ? (
                    <p><BsPersonCircle className="profileIcon"/> {boardData.name}</p>
                  ) : null
                }
                <p>등록일 : {boardData.createAt2}</p>
              </div>
              {
                boardData.flg == "3" || boardData.flg == "4" ? (
                  <span
                    className="board-reportBtn"
                    onClick={() => { setIsOpen(true) }}><PiSiren className="sirenIcon"/>게시글신고
                  </span>
                ) : null
              }
            </div>
          </div>
          {
            boardData.volunteerId && (
              <ReviewInfo boardData={boardData} />
            )
          }

          <div className="board-detail-content">
            {boardData.boardImgs && boardData.boardImgs.map((img, k) => {
              return (
                <div key={img.id} className="board-detail-image">
                  {img.status == "Y" && <img src={`${host}/api/image/${img.name}`}></img>}

                </div>

              )
            })}
            {/* <p>글내용 : {boardData.content}</p> */}
            <div dangerouslySetInnerHTML={{ __html: boardData.content }} />
          </div>
        </div>
          {
            boardData.userId == userInfo.userId || userInfo.auth == "ROLE_ADMIN" ? (
              <div className="board-detail-btn">
                <button onClick={() => { navigate('/board/input', { state: { boardData: boardData, formKind: "modify", boardKind: boardData.flg } }); }}>수정</button>
                <button onClick={removeBoard}>삭제</button>
              </div>
            ) : null
          }


        {/* 댓글영역 */}
        {
          boardData.flg == "3" || boardData.flg == "4" ? (
            <div className="board-reply-container">
              <div className="board-reply-header">
                <p>댓글({replyData.length})</p>
                <button onClick={() => { setPostReplyFlg(!postReplyFlg) }}>댓글작성</button>
              </div>


              {postReplyFlg ?
                <div className="board-reply-input">
                  <textarea
                    onChange={(e) => {
                      console.log(e.target.value);
                      setNewReplyData(e.target.value);
                    }} />
                  <button onClick={newReplyHandle} >입력</button>
                </div> : null}

              {replyData.map((data, i) => (

                <div key={i} className="board-reply-content">
                  {/* 댓글작성자 */}
                  <div className="reply-writter">
                    <p className="reply-writter-nick"><LuFlower className="flowerIcon"/>{data.name}</p>
                  </div>

                  {/* 댓글 수정버튼 누르면 나오는 입력 영역 */}
                  {editReplyFlg && replyIdx === i ? (
                    <div className="board-reply-modify">
                      <textarea
                        value={editReplyContent || data.content} //editReplyContent를 입력 전까지는 data.content를 표시해줌
                        onChange={(e) => {
                          // e.preventDefault;
                          setEditReplyContent(e.target.value);
                        }}
                      />
                      <button onClick={() => { modifyReplyHandle(data.id); }}>저장</button>
                      <button onClick={() => { setEditReplyFlg(!editReplyFlg); }}>취소</button>
                    </div>
                  ) : (
                    <>
                      {/* 댓글내용 */}
                      <div className="reply-content">{data.content}</div>
                    </>
                  )}

                  {/* 댓글날짜 */}
                  <div className="reply-date">{data.createAt2}</div>

                  <div className="reply-button-area">

                    <div className="reply-childBtn-area">
                      {/* 대댓글보기버튼 */}
                      <p onClick={() => { setViewChildReplyFlg(!viewChildReplyFlg), fetchChildReplies(data.id), setReplyIdx(i); }}>{viewChildReplyFlg ? "대댓글닫기" : "대댓글보기"}</p>

                      {/* 대댓글달기버튼 */}
                      <p onClick={() => { setChildReplyFlg(true); setViewChildReplyFlg(true); setReplyIdx(i); }}>댓글달기</p>
                    </div>

                    <div className="reply-modifyBtn-area">
                      {/* 댓글 수정 삭제 버튼 */}
                      {
                        data.userId == userInfo.userId && (
                          <>
                            <button
                              onClick={() => {
                                setEditReplyFlg(true);
                                setReplyIdx(i);
                                console.log(data.content);
                                console.log(typeof (data.content));
                              }}>수정</button>

                            <button onClick={() => { removeReplyHandle(data.id) }}>삭제</button>
                          </>                         
                        )
                      }



                    </div>

                  </div>

                  {/* 대댓글달기 input 영역 */}
                  {postChildReplyFlg && replyIdx === i ? (
                    <div className="child-reply-input">
                      <textarea
                        name={data.id}
                        onChange={(e) => {
                          console.log(e.target.name);
                          // console.log(e.target.value);
                          setNewChildReplyData({ content: e.target.value, reply: e.target.name });
                        }} />
                      <button onClick={newReplyHandle}>작성</button>
                      <button onClick={() => { setChildReplyFlg(false); }}> 취소 </button>
                    </div>
                  ) : null}
                  {/* 대댓글달기 end */}

                  {viewChildReplyFlg && replyIdx === i ? ( // viewChildReplyFlg True/ index맞으면 대댓글창보이게
                    <div className="board-child-reply-container">
                      {childReplyData.map((childData, j) => (
                        <>
                        <MdSubdirectoryArrowRight />
                        <div key={j} className="board-child-reply-content">
                          <div className="child-reply-writter"><LuFlower className="flowerIcon"/>{childData.name}</div>

                          {/* 대댓글 내용 / 수정창 전환영역 */}
                          {editChildReplyFlg && childReplyIdx === j ? (
                            <div>
                              <textarea
                                value={editReplyContent || childData.content}
                                onChange={(e) => {
                                  setEditReplyContent(e.target.value);
                                }}
                              />
                              <button onClick={() => { modifyReplyHandle(childData.id) }}>저장</button>
                              <button onClick={() => { setEditChildReplyFlg(false); }}>취소</button>
                            </div>
                          ) : (
                            <div className="child-reply-content">{childData.content}</div>
                          )}
                          {/* 대댓글 내용 수정창 전환영역 end*/}

                          {/*  대댓글 수정버튼 */}
                          {
                            childData.userId == userInfo.userId && (
                              <>
                                <button
                                  onClick={() => {
                                    setEditChildReplyFlg(true);
                                    setChildReplyIdx(j);
                                    console.log(j);
                                  }}>수정</button>

                                <button onClick={() => { removeReplyHandle(childData.id) }}>삭제</button>
                              </>
                            )
                          }


                        </div>
                        </>
                      ))}

                    </div>

                  ) : null}

                </div>
              ))}
            </div>
          ) : null
        }

        <Modal
          style={modalStyle}
          isOpen={isOpen}
          onRequestClose={() => { setIsOpen(false) }}
        >
          <div>
            <BiX className="XBtn" onClick={() => { setIsOpen(false) }}/>
            <h3 className="report-head" style={{marginTop: '0'}}>신고 사유를 선택해 주세요.</h3>
            <label htmlFor="selectbar">신고사유</label>
            <select id="selectbar" onChange={(e) => { setReportReason(e.target.value) }} value={reportReason}>
              <option value={1}>폭력/욕설</option>
              <option value={2}>광고물</option>
              <option value={3}>선정적인 게시물</option>
              <option value={4}>게시판 성격과 무관한 게시물</option>
            </select>
            <button onClick={reportBoard} className="reportBtn">신고</button>
            <li className="report-alert">허위 신고 시 본인도 불이익을 받을 수 있습니다.</li>
          </div>
        </Modal>
      </div >

    )
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
    width: "400px",
    height: "180px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

export default BoardDetail;
