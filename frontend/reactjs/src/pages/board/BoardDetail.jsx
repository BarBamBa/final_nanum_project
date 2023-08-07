import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BoardDetail() {
  let { id } = useParams();
  const [boardData, setBoardData] = useState({});

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
      try {
        const response = await fetch("/api/boards/" + id);
        if (!response.ok) {
          throw new Error("게시판 정보를 가져오지 못햇습니다.");
        }
        const data = await response.json();
        setBoardData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(typeof(boardData.boardFlg));
    fetchBoards();
  }, []);
  return (
    <>
      <h1>게시판 : {BoardFlg(boardData.boardFlg)}</h1>
      <h1>글쓴이 : {boardData.name}</h1>
      <h1>글제목 : {boardData.title}</h1>
      <h1>글내용 : {boardData.content}</h1>
      <h1>작성일 : {boardData.createAt2}</h1>
    </>
  );
}

export default BoardDetail;
