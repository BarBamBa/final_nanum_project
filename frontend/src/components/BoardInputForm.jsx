import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenCheck } from "./TokenCheck";
import "/src/scss/board/BoardInputForm.scss";
import axios from "axios";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import ReviewSelectForm from "./ReviewSelectForm";

function BoardInputForm() {
  const host = import.meta.env.VITE_API_GATEWAY_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("input kind : ", location.state.boardKind);
  // console.log("input data : ", location.state.boardData);
  if (!location.state) {
    alert("Location state is missing");
    return;
  }

  // const boardData = location.state.boardData;
  const boardKind = location.state.boardKind;
  const [boardData, setBoardData] = useState(location.state.boardData);

  console.log("boardData", boardData);


  // 유저정보
  const userInfo = useContext(TokenCheck);
  console.log(userInfo.userId);
  console.log(userInfo.auth);
  // 유저정보

  const [imgPath, setImgPath] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  // 제목 내용 관리 state 수정이면 boardData에서 title값 가져와 초기값 설정
  const [titleValue, setTitleValue] = useState(location.state.formKind === "modify" ? location.state.boardData.title : "");
  // 글 내용 관리 state => 에디터 적용이후 일단 비활성
  // const [contentValue, setContentValue] = useState(location.state.formKind === "modify" ? location.state.boardData.content : "");
  const [volunteerValue, setVolunteerValue] = useState(location.state.formKind === "modify" ? location.state.boardData.volunteerId : "");
  console.log("volvalue", volunteerValue);
  // 등록된 이미지 데이터
  const [ImagData, setImgData] = useState();
  // 에디터 컨텐츠 담을 state (초기값 empty로)
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 데이터에 컨텐츠를 입력하면 state에 저장
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

  };

  // 에디터에서 줄바꿈이나 글자 스타일을 적용한 글을 태그까지 담아 db에 담기위해  html 형식으로 변환
  const contentRaw = convertToRaw(editorState.getCurrentContent());
  const contentHtml = draftToHtml(contentRaw);

  // 수정버튼으로 들어오면 db에 있던 컨텐츠를 다시 에디터에 담기위해 html 형태에서 에디터에 담기위한 형태로 변환
  useEffect(() => {
    if (location.state.formKind === "modify") {
      const contentHtml = location.state.boardData.content;
      const blocksFromHtml = convertFromHTML(contentHtml);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [location.state.formKind]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleValue == "") {
      alert("제목을 입력해주세요");
      return;
    }

    if (volunteerValue === "" && location.state.boardKind === "4") {
      alert("후기를 작성할 봉사활동을 선태해주세요");
      return;
    }

    if (contentRaw.blocks[0].text === "") {
      alert("내용을 입력해주세요");
      return;
    }

    let boardId;
    // 게시판 글 정보 저장 시작    
    let data;
    // 글쓰기번튼누르면 userid를 전송

    if (location.state.formKind === "write") {
      data = {
        title: titleValue,
        // content: contentValue,
        content: contentHtml,
        flg: boardKind,
        users: {
          id: userInfo.userId
        },
        volunteer: {
          id: volunteerValue
        }
      };
    }

    // 수정버튼누르면 boardid를 전송
    if (location.state.formKind === "modify") {
      data = {
        title: titleValue,
        content: contentHtml,
        id: location.state.boardData.id,
        volunteer: {
          id: volunteerValue
        }
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
          console.log("res", res);
          boardId = res.id;
          // navigate("/board/news");
          console.log("boardId", boardId);
          // handleFileUpload(e);
          // alert("게시글 등록성공");
        });

    } catch (error) {
      console.error("등록 실패 에러", error);
    }

    // 첨부파일 업로드 시작
    const fileInput = e.target.querySelector('input[name="upload"]');
    console.log(fileInput.files);

    if (fileInput.files.length == 0) {//첨부파일없으면 바로 등록완료처리
      alert("등록완료");
      navigate("/board", {
        state: { boardKind: boardKind }
      });
    }

    if (fileInput) {

      for (var i = 0; i < fileInput.files.length; i++) {
        const formData2 = new FormData();

        formData2.append('file', fileInput.files[i]);
        formData2.append('boardId', boardId);
        formData2.append('userId', userInfo.userId);

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

            navigate("/board", {
              state: { boardKind: boardKind }
            });
            alert("등록완료");
          } else {
            console.error("파일 업로드 에러:", uploadResponse.statusText);
          }
        } catch (uploadError) {
          console.error("파일 업로드 에러:", uploadError);
        }
      }

    }
  };

  async function fetchBoards() {
    fetch("/api/boards/" + boardData.id)
      .then((response) => response.json())
      .then((data) => {
        setBoardData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const removeImg = async (imgId) => {
    fetch(`/api/img/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: imgId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("삭제성공");
        fetchBoards();
      })
      .catch((error) => {
        console.error(error);
      });
  }




  return (
    <div className="inputContainer">
      <div className="board-input-nav">
        <h1>{location.state.formKind === "modify" ? "게시판 글 수정" : "게시판 글쓰기"}</h1>
      </div>

      <div className="board-input-form">
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td className="board-input-content-name"><span>제목</span></td>
                <td>
                  <div className="board-input-titleBox">
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
              {
                boardKind == "4" && <ReviewSelectForm setVolunteerValue={setVolunteerValue} volunteerValue={volunteerValue} />
              }
              <tr>
                <td className="board-input-content-name"><span>내용</span></td>
                <td>
                  <div className="board-input contentBox">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={onEditorStateChange}
                      localization={{
                        locale: 'ko',
                      }}
                    />
                  </div>
                </td>
              </tr>
              {location.state.formKind === "modify" &&
                <tr>
                  <td className="board-input-content-name">첨부파일</td>
                  <td>
                    <div className="board-input board-imgList">
                      <table className="board-img-table">
                        <thead>
                          <th>번호</th>
                          <th>이미지</th>
                        </thead>
                        {boardData.boardImgs.map((img, i) => {
                          return (
                            img.status == "Y" && (
                              <tr id={img.id}>
                                <td className="board-img-id">{img.id}</td>
                                {/* <td onClick={() => { document.location.href = `${host}/api/image/${img.name}` }}>{img.name}</td> */}
                                <td onClick={() => { setImgPath(`${host}/api/image/${img.name}`); setIsOpenModal(true); }}>{img.name}</td>
                                <td>
                                  <span onClick={() => removeImg(img.id)}>삭제</span>
                                </td>
                              </tr>)

                          )
                        })}
                      </table>

                    </div>
                  </td>
                </tr>
              }

              <tr>
                <td className="board-input-content-name"><span>파일첨부</span></td>
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
              <tr>
                <td className="board-input-content-name"></td>
                <td>
                  <div className="board-input-submitBox">
                    <button type="submit">
                      {location.state.formKind === "modify" ? "수정하기" : "작성하기"}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>


        </form>
      </div>
      <Modal
        style={modalStyle}
        isOpen={isOpenModal}
        onRequestClose={() => { setIsOpenModal(false) }}
      >
        <img src={imgPath} ></img>
      </Modal>
    </div>

  );
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
    width: "600px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    overflow: "auto",
    top: "20vh",
    left: "30vw",
    right: "38vw",
    bottom: "42vh",
    WebkitOverflowScrolling: "touch",
    borderRadius: "14px",
    outline: "none",
    zIndex: 10,
  },
};

export default BoardInputForm;
