import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenCheck } from "./TokenCheck";
import "/src/scss/board/BoardInputForm.scss";
import axios from "axios";

function BoardInputForm() {
  // 유저정보
  const userInfo = useContext(TokenCheck);
  console.log(userInfo.userId);
  console.log(userInfo.auth);
  // 유저정보

  const location = useLocation();
  const navigate = useNavigate();
  // const [boardId, setBoardId] = useState("");
  const [titleValue, setTitleValue] = useState(location.state.formKind === "modify" ? location.state.boardData.title : "");
  const [contentValue, setContentValue] = useState(location.state.formKind === "modify" ? location.state.boardData.content : "");
  console.log(location.state);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let boardId;
    // 게시판 글 정보 저장 시작    
    let data ;
    // 글쓰기번튼누르면 userid를 전송
    if (location.state.formKind === "write") {
      data = {
        title: titleValue,
        content: contentValue,
        flg: location.state.boardKind,
        users: {
          id: userId.userId //로그인 기능 구현시 수정 할 예정
        },
      };
    } 

    // 수정버튼누르면 boardid를 전송
    if (location.state.formKind === "modify"){
      data = {
        title: titleValue,
        content: contentValue,
        id: location.state.boardData.id
      };
    }
    console.log(data);

    try {
      await fetch("/api/boards/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json())
        .then(res => {
          boardId = res.id;
          // navigate("/board/news");
          console.log("boardId",boardId);
          // handleFileUpload(e);
          // alert("게시글 등록성공");
        });

    } catch (error) {
      console.error("등록 실패 에러", error);
    }

    // 첨부파일 업로드 시작
    const fileInput = e.target.querySelector('input[name="upload"]');
    console.log(fileInput.files);

    if ( fileInput.files.length == 0) {//첨부파일없으면 바로 등록완료처리
      alert("등록완료");
      navigate("/board");
    }

    if (fileInput) {

      for (var i = 0; i < fileInput.files.length; i++) {
        const formData2 = new FormData();

        formData2.append('file', fileInput.files[i]);
        formData2.append('boardId', boardId);

        try {
          const uploadResponse = await axios.post("/api/board/file/upload",
            formData2,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (uploadResponse.status === 200) {
            console.log("파일 업로드 성공:", uploadResponse);
            alert("등록완료");
            navigate("/board");
          } else {
            console.error("파일 업로드 에러:", uploadResponse.statusText);
          }
        } catch (uploadError) {
          console.error("파일 업로드 에러:", uploadError);
        }
      }

    }
  };

  return (
    <div className="inputContainer">
      <div className="board-input-nav">
        <h1>{location.state.formKind === "modify" ? "글 수정" : "글쓰기"}</h1>
      </div>

      <div className="board-input-form">
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td>제목</td>
              <td>
                <div className="board-input titleBox">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <div className="board-input ContentBox">
                  <textarea
                    className="form-control"
                    name="content"
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>파일첨부</td>
              <td>
                <div className="board-input uploadBox">
                  <input
                    type="file"
                    multiple="multiple"
                    className="form-control"
                    name="upload"
                  />
                </div>
              </td>
            </tr>
          </table>

          <button type="submit" className="board-input submitBox">
            {location.state.formKind === "modify" ? "수정하기" : "작성하기"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardInputForm;
