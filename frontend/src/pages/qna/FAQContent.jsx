import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

function FAQContent({ qnaData }) {
    const navigate = useNavigate();

    const handleModify = () => {
        navigate('/qna/input', {
            state: { qnaData: qnaData, formKind: "modify", boardKind: "1" }
        });
    }

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
                        <p>등록일 : {qnaData.createAt2}</p>
                    </div>
                </div>

                <div className="qna-detail-content">
                    {/* <p>글내용 : {qnaData.content}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: qnaData.content }} />
                </div>

            </div>
            <div>
                <button onClick={handleModify}>수정</button>
                <button>삭제</button>
            </div>
        </div>
    )
}

export default FAQContent