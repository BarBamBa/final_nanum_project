import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BoardDetail() {
  let { id } = useParams();
  const [boardData, setBoardData] = useState({});
  const [replyData, setReplyData] = useState([]);
  const [newReplyData, setNewReplyData] = useState();
  const [postReplyFlg, setPostReplyFlg] = useState(false);

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

    async function fetchReplies() {
      fetch("/api/replies/" + id)
        .then((response) => response.json())
        .then((data) => {
          setReplyData(data);
          console.log(replyData);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fetchBoards();
    fetchReplies();
  }, []);

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

  const newReply = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewReplyData(e.target.value);
  }

  const newReplyHandle = async () => {
    const data = {
      content : newReplyData,
      boardId : id
    }
    fetch("/api/reply")
  }


  return (
    <>
      <h1>게시판 : {BoardFlg(boardData.flg)}</h1>
      <h1>글쓴이 : {boardData.name}</h1>
      <h1>글제목 : {boardData.title}</h1>
      <h1>글내용 : {boardData.content}</h1>
      <h1>작성일 : {boardData.createAt2}</h1>
      <button onClick={removeBoard}>삭제</button>
      <div className="reply-container">
        <h3>댓글영역</h3>
        <button onClick={()=>{setPostReplyFlg(!postReplyFlg)}}>댓글작성</button>
        {
          postReplyFlg? 
            <>
              <input type="text" onChange={newReply}></input>
              <button onClick={newReplyHandle} >입력</button>
            </> : null
        }
        {replyData.map((data, i) => (
          <ul key={i}>
            <li>작성자 : {data.name}</li>
            <li>댓글내용 : {data.content}</li>
          </ul>
        ))}
      </div>
    </>
  );
}

export default BoardDetail;
