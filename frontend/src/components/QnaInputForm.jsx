import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

import "/src/scss/qna/QnaInputForm.scss";

const IntroduceContent = styled.div`
  position: relative;
  border: 0.0625rem solid #d7e2eb;
  border-radius: 0.75rem;
  overflow: hidden;
  padding: 1.5rem;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 4rem;
`;

function QnaInputForm() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorToHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const onEditorStateChange = (editorState) => {
        // editorState에 값 설정
        setEditorState(editorState);
    };
    const location = useLocation();
    const navigate = useNavigate();
    // const [boardId, setBoardId] = useState("");
    const [titleValue, setTitleValue] = useState(location.state.formKind === "modify" ? location.state.boardData.title : "");
    const [contentValue, setContentValue] = useState(location.state.formKind === "modify" ? location.state.boardData.content : "");
    console.log(location.state);

    return (
        <>
            <div className="inputContainer">
                <div className="board-input-nav">
                    <h1>{location.state.formKind === "modify" ? "글 수정" : "글쓰기"}</h1>
                </div>

                <Editor
                    // 에디터와 툴바 모두에 적용되는 클래스
                    wrapperClassName="wrapper-class"
                    // 에디터 주변에 적용된 클래스
                    editorClassName="editor"
                    // 툴바 주위에 적용된 클래스
                    toolbarClassName="toolbar-class"
                    // 툴바 설정
                    toolbar={{
                        // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: false },
                    }}
                    placeholder="내용을 작성해주세요."
                    // 한국어 설정
                    localization={{
                        locale: 'ko',
                    }}
                    // 초기값 설정
                    editorState={editorState}
                    // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
                    onEditorStateChange={onEditorStateChange}
                />

            </div>
            <IntroduceContent dangerouslySetInnerHTML={{ __html: editorToHtml }} />
        </>
    )
}


export default QnaInputForm