import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TokenCheck } from "../../components/TokenCheck";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function QnaContent({ qnaData, fetchQna }) {
    const navigate = useNavigate();

    console.log("qna data", qnaData);
    // ---유저정보
    const userInfo = useContext(TokenCheck);
    console.log(userInfo.userId);
    console.log(userInfo.auth);
    // ---유저정보

    const [answerFlg, setAnswerFlg] = useState(false);

    // ---editor
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const contentRaw = convertToRaw(editorState.getCurrentContent());
    const contentHtml = draftToHtml(contentRaw);
    // ---editor

    // 답변달기
    const handleResponse = async () => {
        if (contentRaw.blocks[0].text === "") {
            alert("내용을 입력해주세요");
            return;
        }
        if (!confirm("저장하시겠습니까?")) {
            return;
        }
        let data = {
            parentNo: qnaData.id,
            content: contentHtml,
            flg: "2",
            userId: userInfo.userId
        }
        await fetch("/api/qna/post/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setAnswerFlg(false);
                setEditorState(EditorState.createEmpty());
                fetchQna();
            })
            .catch((error) => {
                console.log(error);
            })
    }

        // qna 삭제
        const removeQna = async () => {

            const id = qnaData.id;
            if (!confirm("삭제하시겠습니까?")) {
                return;
            }
            fetch(`/api/qna/delete/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "N" }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    navigate("/qna");
                })
                .catch((error) => {
                    console.error(error);
                });
        };
    

    const handleModify = () => {
        navigate('/qna/input', {
            state: { qnaData: qnaData, formKind: "modify", boardKind: "2" }
        });
    }

    function formatDate(dateStr) {
        return dateStr.slice(0, 10); // "LocalDateTime" 으로 온 날짜를 "YYYY-MM-DD" 형태로 포맷팅
    }

    console.log(qnaData.answers.length);
    return (
        <div className='qna-detail-container'>
            <div className="qna-detail-kind">
                <h1>{qnaData && qnaData.flg == 1 ? "FAQ" : "QnA"}</h1>
            </div>

            <div className='qna-detail-box'>
                <div className='qna-detail-header'>
                    <div className='qna-title'>
                        <h3>글제목 : {qnaData.title}</h3>
                    </div>
                    <div className="qna-writter-info">
                        <p>글쓴이 : {qnaData.nickname}</p>
                        <p>등록일 : {qnaData.createAt2}</p>
                    </div>
                </div>

                <div className="qna-detail-qnatab-content">
                    <div dangerouslySetInnerHTML={{ __html: qnaData.content }} />
                </div>

                {     //관리자 / 글쓴이만 답변 달기 가능
                    userInfo.auth == "ROLE_ADMIN" || userInfo.userId == qnaData.userId ? (
                        <div className='qna-detail-qnatab-btn'>
                            {
                                qnaData.answers.length == 0 ? (
                                    <>
                                        <button onClick={handleModify} >수정</button>
                                        <button onClick={removeQna}>삭제</button>
                                        <button onClick={() => { setAnswerFlg(true) }}>답변달기</button>
                                    </>
                                ) : null
                            }
                        </div>
                    ) : null
                }

            </div>

            {
                qnaData.answers.length != 0 && (
                    qnaData.answers.map((answer, i) => {
                        console.log(i);
                        console.log(qnaData.answers.length);
                        return (

                            <div className='qna-detail-box' key={answer.id}>
                                <div className='qna-detail-header'>
                                    <div className="qna-writter-info">
                                        {
                                            answer.users.authority == "ROLE_ADMIN" ? // 글쓴이 auth 가 ROLe_ADMIN 이면 그냥 관리자로 표시
                                                <span>글쓴이 : 관리자</span>
                                                : <span>{answer.users.nickname}</span>
                                        }
                                        <span>등록일 : {formatDate(answer.createAt)}</span>
                                    </div>
                                </div>
                                <div className="qna-detail-qnatab-content">
                                    <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                                </div>
                                {
                                    userInfo.auth == "ROLE_ADMIN" || userInfo.userId == qnaData.userId ? (
                                        <div className='qna-detail-qnatab-btn'>
                                            <button
                                                style={qnaData.answers.length == i + 1 ? null : { display: "none" }}
                                                onClick={() => { setAnswerFlg(true) }}>답변달기</button>
                                        </div>
                                    ) : null
                                }

                            </div>
                        )
                    })

                )
            }

            {
                answerFlg && (
                    <div className="qna-detail-qnatab-response">
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                            localization={{
                                locale: 'ko',
                            }}
                        />
                        <button onClick={handleResponse} >저장</button>
                        <button onClick={() => { setAnswerFlg(false) }} >취소</button>
                    </div>
                )
            }


        </div>
    )
}

export default QnaContent