import { useState } from "react";
import { useLocation } from "react-router-dom";
import "/src/scss/board/InputForm.css";

function BoardInputForm() {
  const location = useLocation();
  const [boardName] = useState(location.state.boardName);

  const handleSubmit = async (e) => {
    event.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      flg: location.state.boardKind, // 예시에서는 'A'로 설정
    };

    try {
      const response = await fetch('/api/boards/put', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('등록성공');
      } else {
        console.error('Error submitting board:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting board:', error);
    }
  };

  console.log(location.state);
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
                <div className="board-input emailBox">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td>
                <div className="board-input posswordBox">
                  <textarea
                    className="form-control"
                    name="content"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>파일첨부</td>
              <td>
                <div className="board-input nicknameBox">
                  <input
                    type="file"
                    className="form-control"
                    name="nickname"
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
