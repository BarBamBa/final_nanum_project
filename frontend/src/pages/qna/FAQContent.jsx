import React from 'react'

function FAQContent({qnaData}) {
    return (
        <div className='qna-detail-container'>
            <div className="qna-detail-kind">
                <h1>{qnaData && qnaData.flg == 1 ? "FAQ" : "QnA"}</h1>
            </div>

            <div className='qna-detail-box'>
                <div className='qna-detail-header'>
                    <div className='qna-title'>
                        <h3>글제목 : {qnaData.mtitle}</h3>
                    </div>
                    <div className="qna-writter-info">
                        <p>등록일 : {qnaData.createAt2}</p>
                    </div>
                </div>

                <div className="qna-detail-content">
                    <p>글내용 : {qnaData.mcontent}</p>
                </div>

            </div>
        </div>
    )
}

export default FAQContent