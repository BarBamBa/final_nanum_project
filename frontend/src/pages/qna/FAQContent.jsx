import React, { useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { TokenCheck } from "../../components/TokenCheck";

function FAQContent({ qnaData }) {
    const navigate = useNavigate();

    const userInfo = useContext(TokenCheck);
    console.log(userInfo.userId);
    console.log(userInfo.auth);

    const handleModify = () => {
        navigate('/qna/input', {
            state: { qnaData: qnaData, formKind: "modify", boardKind: "1" }
        });
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
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
            {
                userInfo.auth == "ROLE_ADMIN" && (
                    <div>
                        <button onClick={handleModify}>수정</button>
                        <button onClick={removeQna}>삭제</button>
                    </div>
                )
            }

        </div>
    )
}

export default FAQContent