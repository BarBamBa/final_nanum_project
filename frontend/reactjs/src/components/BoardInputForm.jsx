import { useState } from "react";
import { useLocation } from "react-router-dom";
import "/src/scss/board/InputForm.scss";
import axios from "axios";

function BoardInputForm() {
  const location = useLocation();
  const [boardName] = useState(location.state.boardName);
  const [boardId, setBoardId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 게시판 글 정보 저장 시작
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      content: formData.get("content"),
      flg: location.state.boardKind,
    };

    try {
      const response = await fetch("/api/boards/put", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(res => {
        setBoardId(res.id);
      });
      
      // if (response.ok) {
      //   const res = response.json();

      //   // const resData = await response.json();
      //   // console.log(resData);
        
      //   console.log("res", res.body.id);
      //   // setBoardId(res.id); // BoardImg 테이블에 넣을 Board_Id 뽑아내기

      //   alert("게시글 등록 완료");
      // } else {
      //   console.error("등록 실패:");
      // }
    } catch (error) {
      console.error("등록 실패 에러", error);
    }

    // 첨부파일 업로드 시작
    const fileInput = e.target.querySelector('input[name="upload"]');
    console.log(fileInput.files);

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
            // 파일 업로드 성공 시 처리
          } else {
            console.error("파일 업로드 에러:", uploadResponse.statusText);
            // 파일 업로드 실패 시 처리
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
        <h1>{boardName} 글쓰기</h1>
      </div>

      <div className="board-input-form">
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
              <td>제목</td>
              <td>
                <div className="board-input titleBox">
                  <input type="text" className="form-control" name="title" />
                </div>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <div className="board-input ContentBox">
                  <textarea className="form-control" name="content" />
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoardInputForm;
