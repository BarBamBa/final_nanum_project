import React from 'react'

function QnaContent({ qnaData }) {
    return (
        <div className='qna-detail-container'>
            <div className="qna-detail-kind">
                <h1>{qnaData && qnaData.flg == 1 ? "FAQ" : "QnA"}</h1>
            </div>

            <div className='qna-detail-box'>
                <div className='qna-detail-header'>
                    <div className='qna-title'>
                        <h3>글제목 : {qnaData.utitle}</h3>
                    </div>
                    <div className="qna-writter-info">
                        <p>글쓴이 : {qnaData.nickname}</p>
                        <p>등록일 : {qnaData.createAt2}</p>
                    </div>
                </div>

                <div className="qna-detail-qnatab-content">
                    <span>{qnaData.ucontent}</span>
                </div>
                {qnaData.mcontent ?
                    (<>
                        <h2>관리자 답변</h2>
                        <div className='qna-detail-qnatab-response'>

                            <p>{qnaData.mcontent}</p>
                        </div>
                    </>
                    )
                    : null}


            </div>
        </div>
    )
}

export default QnaContent