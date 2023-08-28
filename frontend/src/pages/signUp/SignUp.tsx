import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';

import '/src/scss/signup/SignUp.scss'
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import axios from 'axios';


const SignUp =() => {

//===== 주소 api ====================================================

  const [zipCode, setZipcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");   
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const completeHandler = (data:any) =>{
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

const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);


const checkNicknameAvailability = async (e) => {
  try {
    const response = await axios.get(`/api/check-nickname/${nickName}`);
    const isAvailable = response.data.isAvailable;

    if (!isAvailable) {
      setIsNicknameAvailable(false);
      alert('이미 사용 중인 닉네임입니다.');
      setNickNameMessage('이미 사용 중인 닉네임입니다')
    } else {
      setIsNicknameAvailable(true);
      alert('사용 가능한 닉네임입니다.');
      setNickNameMessage('사용 가능한 닉네임입니다')
    }
  } catch (error) {
    console.error('닉네임 중복 확인 중 에러:', error);
  }
};


//===== 이메일 중복검사 ====================================================

const [isEmailAvailable, setIsEmailAvailable] = useState(false);

const checkEmailAvailability = async () => {
  try {
    const response = await axios.get(`/api/check-email/${email}`);
    const isEmailAvailable = response.data.isEmailAvailable;

    if (isEmailAvailable) {
      setIsEmailAvailable(true);
      setIsEmailValid(true)
      alert('사용 가능한 이메일입니다.');
      setEmailMessage('사용 가능한 이메일입니다')
    } else {
      setIsEmailAvailable(false);
      alert('이미 사용 중인 이메일입니다.');
      setEmailMessage('이미 사용 중인 이메일입니다')
    }
  } catch (error) {
    console.error('이메일 중복 확인 중 에러:', error);
  }
};


//===== 생년월일 DB이동 나이계산 ====================================================
const [birthdate, setBirthdate] = useState('');

const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(
    birthDate.substring(0, 4),
    birthDate.substring(4, 6) - 1,
    birthDate.substring(6, 8)
  );
  let age = today.getFullYear() - birthDateObj.getFullYear();
  
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age -= 1;
  }

  return age.toString();
};

// ====== 유효성 검사 ============================================================================

  // 이름, 성별, 생년월일, 전화번호, 이메일, 아이디, 비밀번호, 비밀번호 확인, 닉네임
  const [name, setName] = useState('');
  const [gender, setGender] = useState('M');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('')
  // const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickName, setNickName] = useState('');
  
  
  // 오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState('');
  const [ageMessage, setAgeMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [addressMessage, setAddressMessage] = useState('');
  const [detailAddressMessage, setDetailAddressMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [nicknameAvailabilityMessage, setNickNameMessage] = useState('');

  // 유효성 검사
  const [isNameValid, setIsNameValid] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isDetailAddress, setIsDetailAddress] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isnickName, setIsNickName] = useState(false);

  // 공백만, 공백 포함, 특수문자 포함 정규식
  const blank_pattern = /^\s+|\s+$/g;
  const blank_pattern2 = /[\s]/g;
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const number_pattern = /^[0-9]+$/;

  // 알림 후 페이지 이동 
  const navigate = useNavigate();


  // db, 페이지 연결 및 회원가입 빈칸 오류메시지
  const onSubmit = useCallback(
   
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!isNameValid) {
        setNameMessage('이름을 입력해주세요.');
        return;
      } 
      if (!isAge) {
        setAgeMessage('생년월일을 입력해주세요.');
        return;
      } 
      if (!isPhone) {
        setPhoneMessage('전화번호를 입력해주세요.');
        return;
      } 
      if (!detailAddress) {
        setDetailAddressMessage('주소를 입력해주세요.');
        return;
      } 
       if (!isEmailValid) {
        setEmailMessage('이메일을 입력해주세요.');
        return;
      } 
      if (!isPassword) {
        setPasswordMessage('비밀번호를 입력해주세요.');
        return;
      } 
      if (!passwordConfirm) {
        setPasswordConfirmMessage('비밀번호를 확인을 해주세요.');
      
      } 
      if (!isNicknameAvailable) {
        setNickNameMessage('닉네임을 입력해주세요.');

      } 

      try {
        const fullAddress = detailAddress ? `${roadAddress} ${detailAddress}` : roadAddress;
        const calculatedAge = calculateAge(birthdate);

         await axios
          .post("api/signup", {
            phone: phone,
            address: fullAddress,
            detailAddress: detailAddress,
            gender: gender,
            name: name,
            age: calculatedAge,
            password: password,
            nickname: nickName,
            email: email
          }, {
            headers: { "Content-Type": `application/json` },
          }
          
          ).then((res) => {
            alert('회원가입이 완료되었습니다.');
            console.log('Age:', calculatedAge);
            console.log('response:', res);
            navigate('/login');
           
          })        
      } catch (err) {
        console.error(err)
      }
    },
    [name, age, gender , phone, roadAddress, detailAddress, password, nickName , email, isNameValid, isEmailValid, isDetailAddress]
  );

  console.log(isPasswordConfirm)
  console.log(isNicknameAvailable)
  console.log(isPasswordConfirm)

  //========= 이름 유효성 =========
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);
    
    
    if (e.target.value.length < 2 || e.target.value.length > 6) {
      setNameMessage('2글자 이상 6글자 미만으로 입력해주세요.')
      setIsNameValid(false);
    } else if(e.target.value.replace(blank_pattern, '') == ""){
      setNameMessage('공백만 입력되었습니다.')
      setIsNameValid(false); 
    } else if(blank_pattern2.test(e.target.value) == true){
      setNameMessage('공백이 입력되었습니다.')
      setIsNameValid(false); 
    } else if(special_pattern.test(e.target.value) == true){
      setNameMessage('특수문자가 입력되었습니다.')
      setIsNameValid(false); 
    } else if (inputName.trim() === '') {
      setNameMessage('이름을 입력해주세요.');
      setIsNameValid(false);
    } else {
      setNameMessage('올바른 이름 형식입니다.');
      setIsNameValid(true);
    }     console.log(isNameValid);
  }, []);


   //========= 생년월일 유효성 ========
   const onChangeAge = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputBirthdate = e.target.value;
    setBirthdate(inputBirthdate);

    const currentYear = new Date().getFullYear();
    const minimumYear = 1930;

    if (inputBirthdate.length !== 8 || !/^\d+$/.test(inputBirthdate)) {
      setAgeMessage('올바른 형식으로 입력해주세요.')
      setIsAge(false)
    } else if (Number(inputBirthdate.substring(0, 4)) < minimumYear) {
      setAgeMessage('1930년 이후의 생년월일을 입력해주세요.')
      setIsAge(false)
    }else if(e.target.value.replace(blank_pattern, '') == ""){
      setAgeMessage('공백만 입력되었습니다.')
      setIsAge(false) 
    } else if(blank_pattern2.test(e.target.value) == true){
      setAgeMessage('공백이 입력되었습니다.')
      setIsAge(false) 
    } else if(special_pattern.test(e.target.value) == true){
      setAgeMessage('특수문자가 입력되었습니다.')
      setIsAge(false) 
    } else if (inputBirthdate.trim() === '') {
      setAgeMessage('생년월일을 입력해주세요.');
      setIsAge(false);
    } else {
      setAgeMessage('올바른 생년월일 형식입니다.')
      setIsAge(true)
    }
  }, []);


  //========= 전화번호 유효성 =========
  const onChangePhon = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhon = e.target.value;

    const numericInput = inputPhon.replace(/\D/g, '');

    const formattedPhone = numericInput.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

    setPhone(formattedPhone);

    console.log(e.target.value)

    if(e.target.value.length < 11 || e.target.value.length > 11){
      setPhoneMessage('올바른 전화번호 형식이 아닙니다.')
      setIsPhone(false)
    } else 
    if(e.target.value.replace(blank_pattern, '') == ""){
      setPhoneMessage('공백만 입력되었습니다.')
      setIsPhone(false) 
    } 
    else if(blank_pattern2.test(e.target.value) == true){
      setPhoneMessage('공백이 입력되었습니다.')
      setIsPhone(false) 
    } else if(special_pattern.test(e.target.value) == true){
      setPhoneMessage('특수문자가 입력되었습니다.')
      setIsPhone(false) 
    } else if(!number_pattern.test(e.target.value)){
      setPhoneMessage('숫자만 입력가능합니다.')
      setIsPhone(false) 
    } else if (inputPhon.trim() === '') {
      setPhoneMessage('올바른 전화번호 형식이 아닙니다.');
      setIsPhone(false);
    } else if (formattedPhone.length !== 13) {
      setPhoneMessage('올바른 전화번호 형식이 아닙니다.');
      setIsPhone(false);
    } else {
      setPhoneMessage('올바른 전화번호 형식입니다.');
      setIsPhone(true);
    }
  }, []);


  //========= 주소 유효성 =========
  const onChangeAddress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAddress = e.target.value;
    setDetailAddressMessage(inputAddress);

     // 상세 주소검색
     setDetailAddress(e.target.value);

    if(e.target.value.length === 0 || e.target.value.length > 30){
      setAddressMessage('올바른 주소 형식이 아닙니다.')
      setIsDetailAddress(false)
    } else if(e.target.value.replace(blank_pattern, '') == ""){
      setDetailAddressMessage('공백만 입력되었습니다.')
      setIsDetailAddress(false) 
    } else if(special_pattern.test(e.target.value) == true){
      setDetailAddressMessage('특수문자가 입력되었습니다.')
      setIsDetailAddress(false) 
    } else if (inputAddress.trim() === '') {
      setDetailAddressMessage('주소를 입력해주세요.');
      setIsDetailAddress(false);
    }  else {
      setDetailAddressMessage('올바른 주소 형식입니다.')
      setIsDetailAddress(true)
    }     
  }, []);
  

  //========= 이메일 유효성 =========
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    if (e.target.value.length < 10 || e.target.value.length > 30) {
      setEmailMessage('올바른 이메일 형식이 아닙니다.')
      setIsEmailValid(false)
    } else if(e.target.value.replace(blank_pattern, '') == ""){
      setEmailMessage('공백만 입력되었습니다.')
      setIsEmailValid(false) 
    } else if(blank_pattern2.test(e.target.value) == true){
      setEmailMessage('공백이 입력되었습니다.')
      setIsEmailValid(false) 
    } else if (inputEmail.trim() === '') {
      setEmailMessage('이메일을 입력해주세요.');
      setIsEmailValid(false);
    } 
    else if (!checkEmailAvailability) {
      setIsEmailValid(false);
      setEmailMessage('중복확인을 해주세요')
    }  else {
      setIsEmailValid(true)
    }      
  }, []);


  //========= 비밀번호 유효성 =========
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword)

    // 비밀번호 영문 수자 특수문자 조합 정규식
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.')
      setIsPassword(false)
    } else if(e.target.value.replace(blank_pattern, '') == ""){
      setPasswordMessage('공백만 입력되었습니다.')
      setIsPassword(false) 
    } else if(blank_pattern2.test(e.target.value) == true){
      setPasswordMessage('공백이 입력되었습니다.')
      setIsPassword(false) 
    } else if (inputPassword.trim() === '') {
      setPasswordMessage('비밀번호를 입력해주세요.');
      setIsPassword(false);
    } else {
      setPasswordMessage('올바른 비밀번호 입니다.')
      setIsPassword(true)
    } 
  }, []);


  //========= 비밀번호 확인 유효성 =========
  const onChangePasswordConfirm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const inputpasswordConfirmCurrent = e.target.value;
      setPasswordConfirm(inputpasswordConfirmCurrent)

      if (password !== inputpasswordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호가 불일치합니다. 다시 입력해주세요.')
        setIsPasswordConfirm(false)
      }  else if (inputpasswordConfirmCurrent.trim() === '') {
        setPasswordConfirmMessage('비밀번호 확인을 해주세요.');
        setIsPasswordConfirm(false);
      } else {
        setPasswordConfirmMessage('비밀번호가 일치합니다.')
        setIsPasswordConfirm(true)
      }
     
    },
    [password]
  );


  //========= 닉네임 유효성 =========
  const onChangeNickName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNickName = e.target.value;
    setNickName(inputNickName)
    if (inputNickName.length < 2 || inputNickName.length > 8) {
      setNickNameMessage('2글자 이상 8글자 미만으로 입력해주세요.')
      setIsNicknameAvailable(false)
      e.preventDefault();
    }else if(inputNickName.replace(blank_pattern, '') == ""){
      setNickNameMessage('공백만 입력되었습니다.')
      setIsNicknameAvailable(false) 
      e.preventDefault();
    } else if(blank_pattern2.test(inputNickName) == true){
      setNickNameMessage('공백이 입력되었습니다.')
      setIsNicknameAvailable(false) 
      e.preventDefault();
    } else if(special_pattern.test(inputNickName) == true){
      setNickNameMessage('특수문자가 입력되었습니다.')
      setIsNicknameAvailable(false) 
      e.preventDefault();
    } else if(!checkNicknameAvailability){
      setNickNameMessage('중복확인을 해주세요')
      setIsNicknameAvailable(false)
      e.preventDefault();
    } else{
      setNickNameMessage('중복확인을 해주세요.')
      setIsNicknameAvailable(false)
    }     
  }, []);



// ********* 유효성 검사 끝 ***********************************************************************************
  

// === 비밀번호 암호화 ===========================================================================
  const handlePasswordType = (e) => {
    setpwType(() => {
    // 만약 현재 pwType.visible이 false 라면
      if (!pwType.visible) {
        return { type: "text", visible: true };

  //현재 pwType.visible이 true 라면
      } else {
        return { type: "password", visible: false };
      }
    });
  };


//===== 성별 변경 적용====================================================

const genderOptionChange = (option) => {
    setGender(option);
    
    console.log(gender)
  };



  return (

    <>
      <div>
        <div className='signup-text'>회원가입</div>

        <form className='signup-form' onSubmit={onSubmit} >
                     
            <table className="signup-table">
              
              <tbody>
              {/* ======= 이름, 성별 ============================  */}  
                <tr className='signup-name'>
                  <td className="category-name">이름</td>
                  <td>
                    <input 
                        type='text'
                        className={`category-box ${!isNameValid && 'invalid-input'}`}
                        placeholder='이름을 입력해 주세요'
                        name='name'
                        onChange={onChangeName}
                        title='name'
                    >
                    </input>
                    <div className={`message ${!isNameValid ? 'error' : name.length > 0 ? 'success' : ''}`}>
                  {nameMessage}</div>
                  </td>
                  
                </tr>
                
                <tr>
                  <td className="category-name">성별</td>

                  <td>
                    <div className="gender-group">
                      <label className={`gender-button ${gender === 'M' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name='gender'
                          value="M"
                          title='gender'                          
                          checked= {gender === "checked"}
                          
                          onChange={() => genderOptionChange('M')}
                        />
                        남
                      </label>

                      <label className={`gender-button ${gender === 'F' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name='gender'
                          value="F"
                          title='gender'
                          checked={gender === 'F'}
                          onChange={() => genderOptionChange('F')}
                        />
                        여
                      </label>
                    </div>
                  </td>
  

                </tr>
                

              {/* ======= 생년월일 ============================  */}
                <tr>
                  <td className="category-name">생년월일</td>
                  <td>
                    <input 
                        type='tel'
                        className={`age-box ${!isAge && 'invalid-input'}`}
                        placeholder='생년월일을 입력해 주세요 ex) 19870105'
                        name='age'
                        onChange={onChangeAge}
                        title='age'
                    >
                    </input>
                    <div className={`message ${!isAge ? 'error' : age.length < 8 ? 'success' : ''}`}>
                  {ageMessage}</div>
                  </td>
                </tr>


              {/* ======= 전화번호 ============================  */}
                <tr>
                  <td className="category-name">전화번호</td>

                  <td>
                     <input 
                          type='tel' 
                          className={`number-input ${!isPhone && 'invalid-input'}`}
                          name="phone"
                          title="phone"
                          value={phone}
                          onChange={onChangePhon}
                          placeholder='전화번호를 입력해 주세요'
                
                    >                          
                    </input>

                    <div className={`message ${!isPhone ? 'error' : phone.length > 0 ? 'success' : ''}`}>
                        {phoneMessage}</div>
                    
                  </td>
                </tr>


              {/* ======= 주소 ============================  */}
                <tr>
                  <td className="category-name" >주소</td>

                  <td>
                  <input type='text' value={zipCode} readOnly className="category-address" placeholder='우편번호'></input>
                    <button className="search-btn" onClick={modalOpen}>검색</button>
                    <br />
                    <input 
                          type='text' 
                          defaultValue={roadAddress} 
                          className="category-address2"
                          placeholder='주소를 입력해 주세요'
                          name='address'
                          title='address'
                 
                    >                            
                    </input>
                    <input 
                          type='text' 
                          onChange={onChangeAddress}   
                          value={detailAddress} 
                          name='address'
                          title='address'
                          className={`category-address2 ${!isDetailAddress && 'invalid-input'}`}
                          placeholder='상세주소를 입력해 주세요'
                    >                    
                    </input>
                    
                    <div className={`message ${!detailAddress ? 'error' : detailAddress.length > 0 ? 'success' : ''}`}>
                                    {detailAddressMessage}</div>

                    <Modal isOpen={isOpen} ariaHideApp={false} className="address-modal">
                      <DaumPostcode onComplete={completeHandler}  />
                      <button className='modal-close' onClick={modalClose}>닫기</button>
                    </Modal>    

                  </td>

                </tr>

              {/* ======= 이메일 ============================  */}  
                <tr>
                  <td className="category-name">이메일</td>
                  <td>
                    <input 
                          type='email' 
                          className={`email-box ${!isEmailValid && 'invalid-input'}`}
                          placeholder='이메일을 입력해 주세요'
                          name='email'
                          title='email'
                          onChange={onChangeEmail}
                    >                             
                    </input>
                    <button type='button' className="check-btn" onClick={checkEmailAvailability}>중복확인</button>

                     <div className={`message ${isEmailAvailable ? 'success' : 'error'}`}>
                  {emailMessage}</div>
               
                  </td>

                </tr>

              {/* ======= 비밀번호 ===========================  */}
                <tr>
                  <td className="category-name">비밀번호</td>
                  <td>
                    <input 
                          type={pwType.type}
                          placeholder='비밀번호를 입력해 주세요' 
                          className={`category-box ${!isPassword && 'invalid-input'}`}
                          onChange={onChangePassword}
                          name='password'
                          title='password'
                    >
                    </input> 
                    <span className='PwShowBtn' onClick={handlePasswordType}>
                      {pwType.visible ? "비밀번호 숨기기" : "비밀번호 보기"}
                    </span>
                    
                    <div className={`message ${!isPassword ? 'error' : password.length > 0 ? 'success' : ''}`}>
                         {passwordMessage}</div>

                  </td>
                </tr>

                <tr>
                  <td className="category-name">비밀번호 확인</td>
                  <td>
                    <input 
                          type={pwType.type}
                           placeholder='비밀번호를 입력해 주세요' 
                           className={`category-box ${!isPasswordConfirm && 'invalid-input'}`}
                           onChange={onChangePasswordConfirm}
                           title='passwordConfirm'
                    >
                    </input>
                    <div className={`message ${!isPasswordConfirm ? 'error' : passwordConfirm.length > 0 ? 'success' : ''}`}>
                         {passwordConfirmMessage}</div>
                         
                  </td>
                  
                </tr>

              {/* ======= 닉네임 ============================  */}
                <tr>
                  <td className="category-name signup-td ">닉네임</td>
                  <td className="signup-td" >
                    <input        
                          type='text' 
                          placeholder='닉네임을 입력해 주세요' 
                          className={`category-box ${!isNicknameAvailable && 'invalid-input'}`}
                          name="nickname"
                          title='nickName'
                          onChange={onChangeNickName}
                    >
                    </input>
                    <button type='button' className="check-btn" onClick={checkNicknameAvailability}>중복확인</button>
                    <div className={`message ${isNicknameAvailable ? 'success' : 'error'}`}>
                         {nicknameAvailabilityMessage}</div>              
                  </td>          
                </tr>
              </tbody>
            </table>

                <div className="signup-btn">
              <button type='submit' onClick={(e) => {
                console.log('Button clicked')
                
              }} > 회원가입 </button>
            </div>     

        </form>

      </div>
    </>

  );
}



export default SignUp