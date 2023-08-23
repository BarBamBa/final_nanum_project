import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "/src/scss/qna/QnaInputForm.scss";

function QnaInputForm() {
    const location = useLocation();
    const navigate = useNavigate();
    // const [boardId, setBoardId] = useState("");
    const [titleValue, setTitleValue] = useState(location.state.formKind === "modify" ? location.state.boardData.title : "");
    const [contentValue, setContentValue] = useState(location.state.formKind === "modify" ? location.state.boardData.content : "");
    console.log(location.state);
    
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
    )
}

export default QnaInputForm