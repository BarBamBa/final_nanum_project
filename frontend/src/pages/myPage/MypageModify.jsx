import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/MyPage.css'
import './css/MypageModify.css'
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';





function MypageModify()  {

//===== 주소 검색 api =====================================================
const [isOpen, setIsOpen] = useState(false); 

const completeHandler = (data) => {
  setZipcode(data.zonecode);
  setRoadAddress(data.roadAddress);
  setIsOpen(false);
}

  // 주소api 버튼 이벤트

    // 검색창 열기 
    const modalOpen = () =>{
    setIsOpen(!isOpen);
    }
    
    // 검색창 닫기    
    const modalClose = () =>{
    setIsOpen(!isOpen);
    }


//===== 닉네임 중복검사 ====================================================




//===== 이메일 중복검사 ====================================================





  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
    nickname: '',
    address: '',
  }); 

  
  // 유저 정보 호출
  async function fetchProfile() {

    fetch("/api/user/me", {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+ sessionStorage.getItem("accessToken"),
      }
    })  

      .then((response) => response.json())

      .then((data) => {

        setUserInfo(data);

        console.log(data);
        console.log(sessionStorage)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);


  // 유저정보 변경
  const UserInfoChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };


  // 유저정보 업데이트 요청
  const myPageUpdate = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: 'PUT', 
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(userInfo), 
      });

      if (response.ok) {
        alert("수정이 완료되었습니다.")
        navigate("/MyPage")
      } else {
        alert("수정에 실패하였습니다.")
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  
  return (

    <>
      <form className='mypage-form'>

        <div className="myPage-head-font">회원정보 수정</div>

        <div className="myPage-head-bottom"></div>

        <div className="myPage-Container">


          <div className="myPage-Item">

           {/* ==이름========== */}
            <div className="myPage-category">이름</div>
            
            <div className="myPage-textBox">{userInfo.name}</div>


           {/* ==이메일========== */}
            <div className="modify-category">이메일</div>

            <div className="modify-textCheck" >      
              <input 
                type='text'                 
                name='email'
                value={userInfo.email}
                onChange={UserInfoChange}
                className="modify-check"
              >      
              </input>
              <button type='button' className="ModifyCheck-btn">중복확인</button>
            </div>


           {/* ==닉네임 ========== */}

            <div className="modify-category">닉네임</div>
              
            <div className="modify-textCheck" >   
              <input 
                type='text' 
                className='modify-check'
                value={userInfo.nickname}
                name='nickname'
                onChange={UserInfoChange}
              >              
              </input>
              <button type='button' className="ModifyCheck-btn">중복확인</button>
            </div>


            {/* ==전홥번호 ========== */}
           
            <div className="modify-category">전화번호</div>
           
            <div className="modify-textCheck" > 
              <input 
                type='text' 
                className="modify-check" 
                value={userInfo.phone}
                name='phone'
                onChange={UserInfoChange}
              >
              </input>
            </div>


           {/* ==주소========== */}
 
            <div className="modify-category">주소</div>

            <div className="modify-textCheck" >           
              <input 
                type='text' 
                className="modify-check" 
                value={userInfo.address}
                name='address'
                onChange={UserInfoChange}
              >              
              </input>
              <button type='button' className="ModifyCheck-btn" onClick={modalOpen}>검색</button>

              <Modal isOpen={isOpen} ariaHideApp={false} className="address-modal">
                <DaumPostcode onComplete={completeHandler}  />
                <button className='modal-close' onClick={modalClose}>닫기</button>
              </Modal>   
           </div>
             

           {/* ==정보수정 버튼========== */}
            <div className='modifyBtns'>
              <Link to={`/Mypage`}>
              <button className="modify-btn">취소</button>
              </Link>

              <button onClick={myPageUpdate} className="modify-btn">수정하기</button>
            </div>

          </div>       
      
        </div>
           
    </form>

    </>

  )
}

export default MypageModify