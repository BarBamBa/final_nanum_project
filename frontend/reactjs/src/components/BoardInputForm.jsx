import { useState } from "react";
import { useLocation } from "react-router-dom";
import "/src/scss/board/InputForm.css";
import axios from "axios";

function BoardInputForm() {
  const location = useLocation();
  const [boardName] = useState(location.state.boardName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      flg: location.state.boardKind,

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
        console.log(' uploaded successfully:', data);
        alert('등록성공');
      } else {
        console.error('Error submitting board:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting board:', error);
    }


    // 파일업로드 시작
    const fileInput = e.target.querySelector('input[name="upload"]');
    const file = fileInput.files[0];
    console.log(file);
    
    if (file) {
      const formData2 = new FormData();
      formData2.append('file', file);
  
      try {
        const uploadResponse = await axios.post('/api/board/file/upload', formData2, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (uploadResponse.status === 200) {
          console.log('File uploaded successfully:', uploadResponse);
          // 파일 업로드 성공 시 처리
        } else {
          console.error('Error uploading file:', uploadResponse.statusText);
          // 파일 업로드 실패 시 처리
        }
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
      }
    }
  };

  // const handleFileSelect = (event) => {
  //   console.log(event.target.files[0]);
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);
  
  //   fetch('/api/board/file/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((data) => {
  //       console.log('File uploaded successfully:', data);
  //       // 파일 업로드 성공 시 처리
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading file:', error);
  //       // 파일 업로드 실패 시 처리
  //     });
  // };  


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
                <div className="board-input uploadBox">
                  <input
                    type="file"
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
