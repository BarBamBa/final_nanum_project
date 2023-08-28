import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '/src/scss/myPage/myPage.scss'
import '/src/scss/myPage/MypageModify.scss'
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';





function MypageModify()  {

//===== 주소 검색 api =====================================================
const [isOpen, setIsOpen] = useState(false); 
const [modifyAddress, setModifyAddress] = useState('')
const [detailAddress, setDetailAddress] = useState('')

const completeHandler = (data) => {
  setModifyAddress(data.roadAddress);
  setIsOpen(false);
}

  // 주소api 버튼 이벤트

    // 검색창 열기 
    const modalOpen = () =>{
    setIsOpen(!isOpen);
    }
    
    // 검색창 닫기    
    const modalClose = () =>{
      setAddress('');
      setIsOpen(!isOpen);
    }

//***************************************************************************


  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
    nickname: '',
    address: '',
    detailAddress: '',
  }); 

  
  //===== 유저 정보 호출 ====================================================
  async function fetchProfile() {

    fetch("/api/user/me", {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer "+ localStorage.getItem("accessToken"),
      }
    })  

      .then((response) => response.json())

      .then((data) => {

        setUserInfo(data);
        // setPhoneTouched(true);
        console.log(data);
        console.log(localStorage)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchProfile();
  }, []);
//***************************************************************************


//===== 유저정보 업데이트 요청 및 유효성 검사 시작====================================================

const [phoneTouched, setPhoneTouched] = useState(false);
const [isValidPhoneNumber, setIsValidPhoneNumber] = useState('')

  // 정규식을 사용하여 전화번호 패턴을 검사 
const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberPattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return phoneNumberPattern.test(phoneNumber);
};

// 전화번호 010-1234-5678 형식 자동 맞춤 및 문자입력 불가능 적용
const formatPhoneNumber = (input) => {
  const cleanedInput = input.replace(/\D/g, '');
  const match = cleanedInput.match(/^(\d{1,3})(\d{0,4})(\d{0,4})$/);

  if (match) {
    return match[2] ? `${match[1]}-${match[2]}` + (match[3] ? `-${match[3]}` : '') : match[1];
  }

  return input;
};

   // 유저정보 변경 및 유효성
   const UserInfoChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'address') {
      setModifyAddress(value);
    } else if (name === 'detailAddress') {
      setDetailAddress(value);
    }
    
    if (name === 'phone') {
      // 유효성 검사 메시지
      setPhoneTouched(true);
      const isValidPhoneNumber = validatePhoneNumber(value);
      setIsValidPhoneNumber(isValidPhoneNumber);
  
      const formattedPhone = formatPhoneNumber(value);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: formattedPhone,
      }));
    } else {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        [name]: value,
      }));
    }
    

  };

//==== 유저정보 업데이트  ==========================================================
 const myPageUpdate = async (e) => {
  e.preventDefault();

  try {
    // address와 detailAdress를 합쳐서 보낸다.
    const modifiedAddress = modifyAddress || userInfo.address;
    const combinedAddress = detailAddress ? `${modifiedAddress} ${detailAddress}` : modifiedAddress;

    const updatedUserInfo = {
      ...userInfo,
      address: combinedAddress.trim(),
      detailAddress: '', 
    };

    // 서버에 사용자 정보 업데이트 요청 보내기
    const response = await axios.put('/api/user/update', updatedUserInfo, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });

    if (response.status === 500) {
      alert('수정에 실패하였습니다.');
    } else if(isValidPhoneNumber === false) {
      alert('전화번호 입력을 확인해 주세요')
    } 
    else {
      alert('수정이 완료되었습니다.');
      navigate('/MyPage');
    }
  } catch (error) {
    console.error('사용자 정보 업데이트 중 에러:', error);
    alert('이메일과 닉네임 중복확인을 해주세요!!');
  }
};


//===== 이메일 중복검사 ====================================================

const [emailMessage, setEmailMessage] = useState('');
const [isEmailAvailable, setIsEmailAvailable] = useState(false);
const [isEmailValid, setIsEmailValid] = useState(false);

const checkEmailAvailability = async () => {
  
  try {
    const response = await axios.get(`/api/check-email/${userInfo.email}`);
    const isEmailAvailable = response.data.isEmailAvailable;

    if (isEmailAvailable) {
      setIsEmailAvailable(true);
      alert('사용 가능한 이메일입니다.');
      setEmailMessage('사용 가능한 이메일입니다')
      setIsEmailValid(true)
    } else {
      setIsEmailAvailable(false);
      alert('이미 사용 중인 이메일입니다.');
      setEmailMessage('이미 사용 중인 이메일입니다')
    }
  } catch (error) {
    console.error('이메일 중복 확인 중 에러:', error);
  }
 console.log(isEmailValid)
};


//===== 닉네임 중복검사 ====================================================
const [isnickName, setIsNickName] = useState(false);
const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
const [nicknameAvailabilityMessage, setNickNameMessage] = useState('');

const checkNicknameAvailability = async () => {
  try {
    const response = await axios.get(`/api/check-nickname/${userInfo.nickname}`);
    const isAvailable = response.data.isAvailable;

    if (isAvailable) {
      setIsNicknameAvailable(true);
      alert('사용 가능한 닉네임입니다.');
      setNickNameMessage('사용 가능한 닉네임입니다')
      setIsNickName(true)
    } else {
      setIsNicknameAvailable(false);
      alert('이미 사용 중인 닉네임입니다.');
      setNickNameMessage('이미 사용 중인 닉네임입니다')
    }
  } catch (error) {
    console.error('닉네임 중복 확인 중 에러:', error);
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
                className={`modify-check ${!isEmailValid && 'invalid-input'}`}
              >      
              </input>
              <button type='button' className="ModifyCheck-btn" onClick={checkEmailAvailability}>중복확인</button>
            </div>
            <div className={`message ${isEmailAvailable ?  'modifySuccess' : 'modifyError'}`}>
                  {emailMessage}</div>


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
              <button type='button' className="ModifyCheck-btn" onClick={checkNicknameAvailability}>중복확인</button>
            </div>
            <div className={`message ${isNicknameAvailable ? 'modifySuccess' : 'modifyError'}`}>
                         {nicknameAvailabilityMessage}</div> 


            {/* ==전화번호 ========== */}
           
            <div className="modify-category">전화번호</div>
           
            <div className="modify-textCheck" > 
              <input 
                type='text' 
                // className="modify-check" 
                className={`modify-check ${phoneTouched && !isValidPhoneNumber && 'invalid-input'}`}
                value={userInfo.phone}
                name='phone'
                onChange={UserInfoChange}
              >
              </input>
            </div>

            {phoneTouched && userInfo.phone !== '' && !isValidPhoneNumber && (
              <div className="invalid-message">유효한 전화번호 형식이 아닙니다.</div>
            )}


           {/* ==주소========== */}
 
            <div className="modify-category">주소</div>

            <div className="modify-textCheck">
              <input
                type="text"
                className="modify-check"
                value={modifyAddress || userInfo.address}
                name="address"
                onChange={UserInfoChange}
              />
              <button type="button" className="ModifyCheck-btn" onClick={modalOpen}>
                검색
              </button>

              <div className="address-detail">
                <input
                  type="text"
                  onChange={UserInfoChange}
                  value={detailAddress || userInfo.detailAddress}
                  name="detailAddress"
                  title="detailAddress"
                  className="modify-check"
                  placeholder="상세주소를 입력해 주세요"
                />
            </div>

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

              <button type='submit' onClick={myPageUpdate} className="modify-btn">수정하기</button>
            </div>

          </div>       
      
        </div>
           
    </form>

    </>

  )
}

export default MypageModify