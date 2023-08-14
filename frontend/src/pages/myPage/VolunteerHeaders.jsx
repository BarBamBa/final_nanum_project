import React, {useState, useEffect} from 'react'
import './css/VolunteerHeaders.css'



function VolunteerHeaders() {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    localStorage.setItem('activeTab', tabIndex); // 클릭한 탭의 인덱스를 로컬 스토리지에 저장
  };

  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeTab');
    if (storedActiveTab !== null) {
      setActiveTab(Number(storedActiveTab)); // 로컬 스토리지에서 값을 읽어와 탭 상태 설정
    }
  }, []);


  return (
    
    <>

      <div className="Vhead-font">나의 자원봉사</div>
      <div className="Vhead-font-bottom"></div>
    

      <div className="volunteer-header-container">
        <ul className="volunteer-tab">

          <li>
            <a
              href="http://localhost:5173/MyVolunteer"
              className={activeTab === 0 ? 'active' : ''}
              onClick={() => handleTabClick(0)}
            >
              나의자원봉사
            </a>
          </li>

          <li>
            <a
              href="http://localhost:5173/VolunteerSpec"
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => handleTabClick(1)}
            >
              봉사내역
            </a>
          </li>

          <li>
            <a
              href="http://localhost:5173/VolunteerReview"
              className={activeTab === 2 ? 'active' : ''}
              onClick={() => handleTabClick(2)}
            >
              봉사후기
            </a>
          </li>

        </ul>
      </div>
    </>
  );
}

export default VolunteerHeaders



