import React, {useState, useEffect} from 'react'
import '/src/scss/myPage/VolunteerHeaders.scss'
import { Link } from 'react-router-dom';



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
            <li>
              <Link to='/mypage' 
                className={activeTab === 0 ? 'selected' : ''}
                onClick={() => handleTabClick(0)}>
                  회원정보
              </Link>  
            </li>
            <li>
              <Link to='/MyVolunteer' 
                className={activeTab === 1 ? 'selected' : ''}
                onClick={() => handleTabClick(1)}>
                  봉사신청내역
              </Link>  
            </li>
            <li>           
              <Link to='/VolunteerSpec' 
                className={activeTab === 2 ? 'selected' : ''}
                onClick={() => handleTabClick(2)}>
                  봉사완료내역
              </Link>
            </li>
            <li>
              <Link to='/VolunteerReview' 
                className={activeTab === 3 ? 'selected' : ''}
                onClick={() => handleTabClick(3)}>
                  내가작성한글
              </Link>
            </li>
          </ul>
        </div>
    </>
  );
}

export default VolunteerHeaders



