import React, { useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import '/src/scss/mypage/PasswordChange.scss'


function PasswordConfirm() {


  
//===== 유효성 검사==========================================================================
const [pwType, setpwType] = useState({
    type: "password",
    visible: false,
  });

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


  return (
   
    <>
       <form>
        <div className="pageTitle"><span>비밀번호 변경</span></div>
            <div className='PW-Container'>
                <div className='PW-Confirm'>비밀번호 입력 : 
                    <input 
                            type={pwType.type}
                            className='PW-Confirm-box' 
                            placeholder='비밀번호를 입력해 주세요' 
                            name='password'
                            title='password'
                    >            
                    </input>   

                    <span className='chek-PWShowBtn' onClick={handlePasswordType}>
                        {pwType.visible ? "비밀번호 숨기기" : "비밀번호 보기"}
                    </span>
                    
                </div>

                <button className='PW-Confrim-Btn'>비밀번호 확인</button>
            </div>
        </form>
    </>
   
  )
}

export default PasswordConfirm