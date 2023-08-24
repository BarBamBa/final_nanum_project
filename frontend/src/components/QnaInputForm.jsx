import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenCheck } from "./TokenCheck";
import "/src/scss/board/BoardInputForm.scss";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function QnaInputForm() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("input kind : " , location.state);

    // 유저정보
    const userInfo = useContext(TokenCheck);
    console.log(userInfo.userId);
    console.log(userInfo.auth);
    // 유저정보

    // 제목 내용 관리 state 수정이면 boardData에서 title값 가져와 초기값 설정
    // const [titleValue, setTitleValue] = useState(location.state.formKind === "modify" ? location.state.boardData.title : "");
    const [titleValue, setTitleValue] = useState("");
    // 글 내용 관리 state => 에디터 적용이후 일단 비활성
    // const [contentValue, setContentValue] = useState(location.state.formKind === "modify" ? location.state.boardData.content : "");

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
        let qnaId;
        let data;

        if (location.state.formKind === "write" && location.state.boardKind === "1") {
            data = {
                mTitle: titleValue,
                mContent: contentHtml,
                flg: location.state.boardKind,
                managerId: {id :userInfo.userId},
            };
        }

        // 수정버튼누르면 boardid를 전송
        if (location.state.formKind === "modify" && location.state.boardKind === "1") {
            data = {
                mTitle: titleValue,
                mContent: contentHtml,
                id: location.state.qnaData.id
            };
        }

        if (location.state.formKind === "write" && location.state.boardKind === "2") {
            data = {
                uTitle: titleValue,
                uContent: contentHtml,
                flg: location.state.boardKind,
                userId: {id :userInfo.userId},
            };
        }

        if (location.state.formKind === "modify" && location.state.boardKind === "2") {
            data = {
                uTitle: titleValue,
                uContent: contentHtml,
                id: location.state.qnaData.id
            };
        }
        console.log(data);

        try {
            await fetch("/api/qna/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    qnaId = res.id;
                    // navigate("/board/news");
                    console.log("qnaId", qnaId);
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
            navigate("/qna");
        }

        if (fileInput) {

            for (var i = 0; i < fileInput.files.length; i++) {
                const formData2 = new FormData();

                formData2.append('file', fileInput.files[i]);
                formData2.append('qnaId', qnaId);

                try {
                    const uploadResponse = await axios.post("/api/qna/file/upload",
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
                        navigate("/qna");
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
    )
}


export default QnaInputForm