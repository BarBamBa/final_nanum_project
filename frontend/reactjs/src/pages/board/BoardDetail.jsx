import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState({}); //게시글 정보
  const [replyData, setReplyData] = useState([]); //댓글 리스트
  const [childReplyData, setChildReplyData] = useState([]); //대댓글 리스트

  const [newReplyData, setNewReplyData] = useState(); //댓글작성용데이터
  const [editReplyContent, setEditReplyContent] = useState(); //댓글수정용데이터

  const [postReplyFlg, setPostReplyFlg] = useState(false); //댓글입력창 flg
  const [editReplyFlg, setEditReplyFlg] = useState(false); //댓글수정창 flg
  const [viewChildReplyFlg, setViewChildReplyFlg] = useState(false);
  const [reReplyFlg, setReReplyFlg] = useState(false); //대댓글입력창 flg
  const [editDeleteFlg, setEditDeleteFlg] = useState("delete");

  const [editedReplyIndex, setEditedReplyIndex] = useState(0); //댓글번호

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

  useEffect(() => {
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

    fetchBoards();
    fetchReplies();
  }, []);

  // 대댓글 조회
  const fetchChildReplies = async (parentId) => {
    setViewChildReplyFlg(!viewChildReplyFlg);
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
  }
  console.log(childReplyData);

  // 게시글 삭제
  const removeBoard = () => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // 댓글 입력
  const newReplyHandle = async () => {
    const data = {
      content: newReplyData
    }
    fetch(`/api/replies/post/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 댓글 수정 삭제
  const modifyReplyHandle = async (i) => {
    let data;
    if (editDeleteFlg === "edit") {
      data = {
        content: editReplyContent,
        status: "Y"
      }
    }
    if (editDeleteFlg === "delete") {
      data = {
        status: "N"
      }
    }

    console.log(replyData[i].id);
    fetch(`/api/replies/update/${replyData[i].id}`, {
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
        setEditedReplyIndex(0);
        setEditReplyContent("");
        setEditDeleteFlg("delete")
      })
      .catch((error) => {
        console.error(error);
      })
  }


  return (
    <>
      <h1>게시판 : {BoardFlg(boardData.flg)}</h1>
      <h1>글쓴이 : {boardData.name}</h1>
      <h1>글제목 : {boardData.title}</h1>
      <h1>글내용 : {boardData.content}</h1>
      <h1>작성일 : {boardData.createAt2}</h1>
      <button onClick={() => { navigate('/board/input', { state: { boardData: boardData, formKind: "modify" } }); }}>수정</button>
      <button onClick={removeBoard}>삭제</button>
      <div className="reply-container">
        <h3>댓글영역</h3>
        <button onClick={() => { setPostReplyFlg(!postReplyFlg) }}>댓글작성</button>
        {
          postReplyFlg ?
            <>
              <input type="text"
                onChange={(e) => {
                  console.log(e.target.value);
                  setNewReplyData(e.target.value);
                }}></input>
              <button onClick={newReplyHandle} >입력</button>
            </> : null
        }
        {
          replyData.map((data, i) => (

            <div key={i}>
              <div> 글쓴이 : {data.name}</div>

              {editReplyFlg && editedReplyIndex === i ? (
                <>
                  <input
                    type="text"
                    value={editReplyContent || data.content} //editReplyContent를 입력 전까지는 data.content를 표시해줌
                    onChange={(e) => {
                      e.preventDefault;
                      setEditReplyContent(e.target.value);
                    }}
                  />
                  <button onClick={() => { modifyReplyHandle(i) }}>저장</button>
                </>
              ) : (
                <>
                  <div>{data.content}</div>
                  <button onClick={() => { fetchChildReplies(data.id), setEditedReplyIndex(i); }}>대댓글보기</button>
                  <button
                    onClick={() => {
                      setEditReplyFlg(true);
                      setEditedReplyIndex(i);
                      setEditDeleteFlg("edit");
                      // console.log(editDeleteFlg);
                      // console.log(editedReplyIndex);
                    }}
                  >
                    수정
                  </button>
                  <button onClick={() => { modifyReplyHandle(i) }}>삭제</button>
                  <button onClick={() => { setReReplyFlg(true) }}>답글</button>
                  {
                    reReplyFlg && editedReplyIndex === i ? (
                      <>
                        <input />
                        <button>작성</button>
                        <button onClick={() => { setReReplyFlg(false) }}> 취소 </button>
                      </>
                    ) : null
                  }
                  {
                    viewChildReplyFlg && editedReplyIndex === i ? (
                      <div>
                        <h3>대댓글영역</h3>
                        {childReplyData.map((childData, i) => (
                          <div key={i}>
                            <div>대댓글내용 : {childData.content}</div>
                          </div>
                        ))}

                      </div>

                    ) : null
                  }

                </>
              )}

            </div>


          ))
        }
      </div>
    </>
  );
}

export default BoardDetail;
