import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenCheck } from "./TokenCheck";

function ReviewSelectForm({ setVolunteerValue, volunteerValue }) {
    const [volList, setVolList] = useState([]);

    const userInfo = useContext(TokenCheck);
    console.log(userInfo.userId);
    console.log(userInfo.auth);

    async function fetchVolList() {
        await fetch(`/api/boards/applicants/${userInfo.userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVolList(data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetchVolList();
    }, [userInfo.userId]);
    console.log(volList);

    return (
        volList &&
        <tr>
            <td className="board-input-content-name"><span>봉사활동</span></td>
            <td>
                <div className="board-input volunteer-box">
                    <select onChange={(e) => setVolunteerValue(e.target.value)} value={volunteerValue}>
                        <option value="">봉사활동선택</option>
                        {volList.map((volunteer, i) => (
                            volunteer.status == "F" &&
                            <option key={volunteer.volunteerId} value={volunteer.volunteerId}>
                                {volunteer.volunteerTitle}
                            </option>
                        ))}
                    </select>
                </div>
            </td>
        </tr>
    )
}

export default ReviewSelectForm