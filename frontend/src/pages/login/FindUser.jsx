import React, { useState } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';


import '/src/scss/login/FindUser.scss';


function FindUser() {

  const [tabText, setTabText] = useState('아이디 찾기');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('')

  const [phoneMessage, setPhoneMessage] = useState('');
  const [isPhone, setIsPhone] = useState(false);

  const [foundEmail, setFoundEmail] = useState('');
  const [foundPassword, setFoundPassword] = useState('');
  const [emailError, setEmailError] = useState('');


  const handleTabChange = (event) => {
    setTabText((prevTabText) =>
      prevTabText === '아이디 찾기' ? '비밀번호 찾기' : '아이디 찾기'
    );
  };

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }


//=====이메일 찾기 ==========================================================================
  const handleFindEmail = (e) => {
    e.preventDefault();

    fetch("/api/id", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
      }),
    })
    .then(res => res.json())
    .then(res => {
      if (res.foundEmail) {
        setFoundEmail('이메일 : ' + res.foundEmail);
      } else if (res.error) {
        setFoundEmail(res.error);
      } else {
        setFoundEmail('일치하는 정보를 찾을 수 없습니다.');
      }
    });
  };

//=====비밀번호 찾기 ==========================================================================

const isValidEmailFormat = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const handleFindPassword = () => {

  if(name=== '') {
    alert('이름 입력해 주세요.')

  } else if(phone === '') {
    alert('전화번호를 입력해 주세요.')

  } else if(!isPhone) {
    alert('전화번호를 확인해 주세요.')

  }else if(email === '') {
    alert('이메일을 입력해 주세요.')

  } else if (!isValidEmailFormat(email)) {
    alert('올바른 이메일 형식이 아닙니다.')
    
  } else if (name && isPhone && email) {
    fetch("/api/password", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    })
    .then(res => {
      if (!res.ok) {
        alert('일치하는 계정을 찾을 수 없습니다.');
      } else {
        console.log("서버 응답:", res);
        alert('임시 비밀번호를 이메일로 발송하였습니다.');
        navigate('/login');
      }
    })
    .catch(error => {
      console.error("오류:", error);
      alert('비밀번호 전송 중 오류가 발생했습니다.');
    });
  }
}

  
//===== 유효성 검사==========================================================================

  const blank_pattern = /^\s+|\s+$/g;
  const blank_pattern2 = /[\s]/g;
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  const number_pattern = /^[0-9]+$/;


  
//== 전화번호 유효성 ==============================
  const onChangePhon = useCallback((e) => {
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
      setPhoneMessage('');
      setIsPhone(true);
    }
  }, []);
  

  return (
   
    <>
      <form>
        <div className="main">
          <input type="radio" id="tab-1" name="show" checked={tabText === '아이디 찾기'}
            onChange={handleTabChange}/>
          <input type="radio" id="tab-2" name="show" checked={tabText === '비밀번호 찾기'}
            onChange={handleTabChange} />
          
          <div className="tab">
            <label htmlFor="tab-1">아이디 찾기</label>
            <label htmlFor="tab-2">비밀번호 찾기</label>
          </div>

          <div className="content">
            
            {/* ==================== 아이디 찾기 ===================================================== */}
         
            <div className="content-div">


              <input 
                type='text' 
                className="findUser-textbox"
                placeholder='이름을 입력해 주세요'
                name='name'
                title='name'
                value={name}
                onChange={onChangeName}
              />

              <input 
                type='tel' 
                className="findUser-textbox" 
                placeholder='전화번호를 입력해 주세요'
                name="phone"
                title="phone"
                value={phone}
                onChange={onChangePhon}
              />
            
              <div className={`message ${!isPhone ? 'find-error' : phone.length > 0 ? 'find-success' : ''}`}>
                {phoneMessage}
              </div>

                <button onClick={handleFindEmail} className="findUser-button">아이디 찾기</button>
                <div className='find-Email'>{foundEmail}</div>
            </div>


            {/* ==================== 비밀번호 찾기 ===================================================== */}
            <div className="content-div">
              
              <div>
                <input 
                  type='text' 
                  className="findUser-textbox"
                  placeholder='이름을 입력해 주세요'
                  name='name'
                  title='name'
                  value={name}
                  onChange={onChangeName}
                  >
                </input>
              </div>

              <div>
                <input 
                     type='tel' 
                     className="findUser-textbox" 
                     placeholder='전화번호를 입력해 주세요'
                     name="phone"
                     title="phone"
                     value={phone}
                     onChange={onChangePhon}
                  >
                </input>
              </div>
              
              <div className={`message ${!isPhone ? 'find-error' : phone.length > 0 ? 'find-success' : ''}`}>
                {phoneMessage}
              </div>

              <div>
                <input 
                  type='email' 
                  className="findUser-textbox" 
                  placeholder='이메일을 입력해 주세요'
                  value={email}
                  onChange={onChangeEmail}
                  >
                </input>
                <div className="error-message">{emailError}</div>
              </div>


              <div>
                <button type='button' className="findUser-button" onClick={handleFindPassword} >비밀번호 찾기</button>

              </div>

            </div>
          </div>
        </div>      
      </form>

      
    </>
   
  )
}

export default FindUser