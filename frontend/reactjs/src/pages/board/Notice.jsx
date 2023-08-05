import React, { useState } from "react";

function Notice() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input></input>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>공지</td>
            <td>2023 하반기 봉사활동 일정 안내</td>
            <td>2023. 05. 23</td>
          </tr>
          <tr>
            <td>공지</td>
            <td>2023 하반기 봉사활동 일정 안내</td>
            <td>2023. 05. 23</td>
          </tr>
          <tr>
            <td>공지</td>
            <td>2023 하반기 봉사활동 일정 안내</td>
            <td>2023. 05. 23</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Notice;
