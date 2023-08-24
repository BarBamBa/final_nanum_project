import React, {useState, useEffect} from 'react'
import '/src/scss/myPage/VolunteerHeaders.scss'



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
        <div className="volunteer-header-container">
          <ul className="volunteer-tab">
            <li className={activeTab === 0 ? 'selected' : ''}
                onClick={() => handleTabClick(0)}>
              <a href="http://localhost:5173/MyVolunteer" className={activeTab === 0 ? 'selected' : ''} >
                나의자원봉사
              </a>
            </li>
            <li className={activeTab === 1 ? 'selected' : ''}
                onClick={() => handleTabClick(1)}>
              <a href="http://localhost:5173/VolunteerSpec" className={activeTab === 1 ? 'selected' : ''}>
                봉사완료내역
              </a>
            </li>
            <li className={activeTab === 2 ? 'selected' : ''}
                onClick={() => handleTabClick(2)}>
              <a href="http://localhost:5173/VolunteerReview" className={activeTab === 2 ? 'selected' : ''}>
                내가작성한글
              </a>
            </li>
          </ul>
        </div>
    </>
  );
}

export default VolunteerHeaders



