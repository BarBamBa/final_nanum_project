import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
function ReviewInfo({ boardData }) {
    const volId = boardData.volunteerId;
    console.log(volId);

    const [volInfo, setVolInfo] = useState();

    async function fetchVolInfo() {
        await fetch("/api/boards/volunteer/" + volId)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVolInfo(data);
            })
    }

    useEffect(() => {
        fetchVolInfo();
    }, []);

    function formatDate(dateStr) {
        return dateStr.slice(0, 10); // "LocalDateTime" 으로 온 날짜를 "YYYY-MM-DD" 형태로 포맷팅
    }

    return (
        volInfo &&
        <div className="board-detail-review-info-list">
            <div>
                <li className="board-detail-review-info review-title">
                    <div className="board-detail-review-dataname">봉사활동</div>
                    <div>{volInfo.progrmSj}</div>
                </li>
                <li className="board-detail-review-info review-date">
                    <div className="board-detail-review-dataname">봉사기간</div>
                    <div>{formatDate(volInfo.progrmBgnde)} ~ {formatDate(volInfo.progrmEndde)}</div>
                </li>
                <li className="board-detail-review-info review-ministry">
                    <div className="board-detail-review-dataname">봉사기관</div>
                    <div>{volInfo.mnnstNm}</div>
                </li>
                <li className="board-detail-review-info review-field">
                    <div className="board-detail-review-dataname">봉사분야</div>
                    <div>{volInfo.srvcClCode}</div>
                </li>
            </div>
        </div>
    )
}

export default ReviewInfo