import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FAQContent from './FAQContent';
import QnaContent from './QnaContent';

function QnaDetail() {
    let { id } = useParams();
    const [qnaData, setQnaData] = useState();

    // qna 조회
    async function fetchQna() {
        fetch("/api/qna/" + id)
            .then((res) => res.json())
            .then((data) => {
                setQnaData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchQna();
    }, []);


    console.log(qnaData);
    return (
        qnaData && (
            qnaData.flg == 1 ? <FAQContent qnaData={qnaData} /> : <QnaContent qnaData={qnaData} fetchQna={fetchQna} />
        )
    )
}

export default QnaDetail