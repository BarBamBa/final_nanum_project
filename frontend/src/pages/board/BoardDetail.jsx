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
  const [newChildReplyData, setNewChildReplyData] = useState({}); //대댓글작성용데이터

  const [postReplyFlg, setPostReplyFlg] = useState(false); //댓글입력창 flg
  const [editReplyFlg, setEditReplyFlg] = useState(false); //댓글수정창 flg

  const [viewChildReplyFlg, setViewChildReplyFlg] = useState(false); //대댓글보기 flg
  const [childReplyFlg, setChildReplyFlg] = useState(false); //대댓글입력창 flg
  const [editChildReplyFlg, setEditChildReplyFlg] = useState(false); //대댓글수정창flg
  const [editDeleteFlg, setEditDeleteFlg] = useState("delete"); //댓글 수정 / 입력 flg

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
  }


  // 게시글 삭제
  const removeBoard = async () => {
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


  // 댓글 / 대댓글입력
  const newReplyHandle = async () => {
    let data;
    if (postReplyFlg) {
      if (newReplyData == null) {
        alert("댓글을 입력해주세요");
        return;
      }
      data = {
        content: newReplyData
      }
    } else {
      if (newChildReplyData == null) {
        alert("댓글을 입력해주세요");
        return;
      }
      data = {
        content: newChildReplyData.content,
        reply: newChildReplyData.reply
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

  // 댓글 수정/삭제
  const modifyReplyHandle = async (i) => {
    console.log(editReplyFlg);
    console.log(editedReplyIndex);
    console.log(editDeleteFlg);
    let data;
    if (editDeleteFlg === "edit") {
      if (editReplyContent == "") {
        setEditReplyFlg(false);
        setEditChildReplyFlg(false);
        setEditedReplyIndex(0);
        setEditDeleteFlg("delete");
        alert("수정완료");
        return;
      }
      data = {
        content: editReplyContent,
        status: "Y"
      }
      // if (editReplyContent == null) {

      //   alert("댓글을입력해주세요");
      //   return;
      // }

      if (!confirm("수정하시겠습니까?")) {
        return;
      }
    }

    if (editDeleteFlg === "delete") {
      data = {
        status: "N"
      }
      if (!confirm("삭제하시겠습니까?")) {
        return;
      }
    }

    console.log(i);
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
        setEditedReplyIndex(0);
        setEditReplyContent("");
        setEditDeleteFlg("delete");
        fetchReplies();
        fetchChildReplies(childReplyData[0].reply);//부모댓글id로 대댓글 fetch해서 대댓글 바로렌더링
        alert("수정완료");
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <div className="board-detail-container">
      {/* 게시글 영역 */}
      <div className="board-detail-kind">
        <h2>{BoardFlg(boardData.flg)}</h2>
      </div>

      <div className="board-detail-box">
        <div className="board-detail-header">
          <div className="board-title">
            <h3>글제목 : {boardData.title}</h3>
          </div>
          <div className="board-writter-info">
            <p>글쓴이 : {boardData.name}</p>
            <p>등록일 : {boardData.createAt2}</p>
          </div>

        </div>

        <div className="board-detail-content">
          <div>이미지영역</div>
          <p>글내용 : {boardData.content}</p>
        </div>

        <button onClick={() => { navigate('/board/input', { state: { boardData: boardData, formKind: "modify" } }); }}>수정</button>
        <button onClick={removeBoard}>삭제</button>
      </div>


      {/* 댓글영역 */}
      <div className="board-reply-container">
        <div className="board-reply-header">
          <p>댓글({replyData.length})</p>
          <button onClick={() => { setPostReplyFlg(!postReplyFlg) }}>댓글작성</button>
        </div>


        {postReplyFlg ?
          <div className="board-reply-input">
            <input
              type="text"
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
              <p>글쓴이 : {data.name}</p>
            </div>

            {/* 댓글 수정버튼 누르면 나오는 입력 영역 */}
            {editReplyFlg && editedReplyIndex === i ? (
              <div>
                <input
                  type="text"
                  value={editReplyContent || data.content} //editReplyContent를 입력 전까지는 data.content를 표시해줌
                  onChange={(e) => {
                    // e.preventDefault;
                    setEditReplyContent(e.target.value);
                  }}
                />
                <button onClick={() => { modifyReplyHandle(data.id) }}>저장</button>
                <button onClick={() => { setEditReplyFlg(!editReplyFlg); setEditDeleteFlg("delete"); }}>취소</button>
              </div>
            ) : (
              <>
                {/* 댓글내용 */}
                <div className="reply-content">{data.content}</div>
              </>
            )}
            <div className="reply-date">{data.createAt2}</div>

            <div className="reply-button-area">

              <div className="reply-childBtn-area">
                {/* 대댓글보기버튼 */}
                <p onClick={() => { setViewChildReplyFlg(!viewChildReplyFlg), fetchChildReplies(data.id), setEditedReplyIndex(i); }}>대댓글보기</p>

                {/* 대댓글달기 */}
                <p onClick={() => { setChildReplyFlg(true); setViewChildReplyFlg(true); setEditedReplyIndex(i); }}>댓글달기</p>
              </div>

              <div className="reply-modifyBtn-area">

                {/* 댓글수정버튼 */}
                <button
                  onClick={() => {
                    setEditReplyFlg(true);
                    setEditedReplyIndex(i);
                    setEditDeleteFlg("edit");
                  }}>수정</button>
                {/* 수정버튼 end */}

                {/* 댓글삭제 */}
                <button onClick={() => { modifyReplyHandle(data.id) }}>삭제</button>
              </div>

            </div>

            {childReplyFlg && editedReplyIndex === i ? (
              <div className="child-reply-input">
                <input
                  type="text"
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


            {viewChildReplyFlg && editedReplyIndex === i ? ( // viewChildReplyFlg True/ index맞으면 대댓글창보이게
              <div className="board-child-reply-container">
                {childReplyData.map((childData, i) => (
                  <div key={i} className="board-child-reply-content">
                    <div className="child-reply-writter">대댓글작성자 : {childData.name}</div>

                    {/* 대댓글 내용 / 수정창 전환영역 */}
                    {editChildReplyFlg && editedReplyIndex === i ? (
                      <div>
                        <input
                          type="text"
                          value={editReplyContent || childData.content}
                          onChange={(e) => {
                            setEditReplyContent(e.target.value);
                          }}
                        />
                        <button onClick={() => { modifyReplyHandle(childData.id) }}>저장</button>
                        <button onClick={() => { setEditChildReplyFlg(false); setEditDeleteFlg("delete"); }}>취소</button>
                      </div>
                    ) : (
                      <div className="child-reply-content">{childData.content}</div>
                    )}
                    {/* 대댓글 내용 수정창 전환영역 end*/}

                    {/*  대댓글 수정버튼 */}
                    <button
                      onClick={() => {
                        setEditChildReplyFlg(true)
                        setEditedReplyIndex(i)
                        setEditDeleteFlg("edit")
                      }}>수정</button>

                    {/* 대댓글 삭제버튼 */}
                    <button onClick={() => { modifyReplyHandle(childData.id) }}>삭제</button>

                  </div>
                ))}

              </div>

            ) : null}




          </div>


        ))}
      </div>
    </div >
  );
}

export default BoardDetail;
