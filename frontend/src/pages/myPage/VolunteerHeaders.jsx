import React, {useState, useEffect} from 'react'
import '/src/scss/myPage/VolunteerHeaders.scss'
import { Link, useLocation } from 'react-router-dom';



function VolunteerHeaders() {

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    localStorage.setItem('activeTab', tabIndex);
  };

  useEffect(() => {
    const storedActiveTab = localStorage.getItem('activeTab');
    if (storedActiveTab !== null) {
      setActiveTab(Number(storedActiveTab));
    }

    // URL의 경로에 따라 활성 탭 설정
    if (location.pathname === '/mypage') {
      setActiveTab(0);
    } else if (location.pathname === '/myVolunteer') {
      setActiveTab(1);
    } else if (location.pathname === '/volunteerSpec') {
      setActiveTab(2);
    } else if (location.pathname === '/volunteerReview') {
      setActiveTab(3);
    }
  }, [location.pathname]);


  return (
    
    <>
        <div className="volunteer-header-container">
          <ul className="volunteer-tab" >
            <li>
              <Link to='/mypage' 
                className={activeTab === 0 ? 'selected' : ''}
                onClick={() => handleTabClick(0)}>
                  회원정보
              </Link>  
            </li>
            <li>
              <Link to='/myVolunteer' 
                className={activeTab === 1 ? 'selected' : ''}
                onClick={() => handleTabClick(1)}>
                  봉사신청내역
              </Link>  
            </li>
            <li>           
              <Link to='/volunteerSpec' 
                className={activeTab === 2 ? 'selected' : ''}
                onClick={() => handleTabClick(2)}>
                  봉사완료내역
              </Link>
            </li>
            <li>
              <Link to='/volunteerReview' 
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



