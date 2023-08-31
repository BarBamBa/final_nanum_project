import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '/src/scss/myPage/PasswordChange.scss'
import PasswordConfirm from './PasswordConfirm';

function ChangePassword() {

    const navigate = useNavigate('')

// 새 비밀번호 입력 및 유효성 체크
    const [password, setPassword] = useState('')
    const [isPassword, setIsPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');

// 새 비밀번호 확인 입력 및 유효성 체크
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);


// === 비밀번호 암호화 ===========================================================================

    const [pwType, setpwType] = useState({
        type: "password",
        visible: false,
    });

    const handlePasswordType = (e) => {
        setpwType(() => {
            // 만약 현재 pwType.visible이 false 라면 안보이게
            if (!pwType.visible) {
                return { type: "text", visible: true };

//현재 pwType.visible이 true 라면 보이게
            } else {
                return { type: "password", visible: false };
            }
        });
    };


//========= 비밀번호 유효성 ======================================================
    const onChangePassword = useCallback((e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword)

        // 비밀번호 영문 숫자 특수문자, 공백만, 공백 포함 조합 정규식
        const blank_pattern = /^\s+|\s+$/g;
        const blank_pattern2 = /[\s]/g;
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


//========= 비밀번호 확인 유효성 ======================================================
    const onChangePasswordConfirm = useCallback((e) => {
            const inputpasswordConfirmCurrent = e.target.value;
            setConfirmPassword(inputpasswordConfirmCurrent)

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


//===== 유저 정보 호출 ====================================================

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });


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
                console.log(localStorage)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchProfile();
    }, []);



//==== 유저정보 업데이트  ==========================================================
    const passwordUpdate = async (e) => {
        e.preventDefault();


        try {
            const requestBody = {
                email: userInfo.email,
                password: password,
            };

            const response = await axios.put(
                '/api/user/passwordUpdate',
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                }
            );

            if (response.status === 500){
                alert('비밀번호 변경에 실패하였습니다.');
            } else if (password !== confirmPassword) {
                alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
                return;
            } else if(!isPassword){
                setPasswordMessage('비밀번호를 확인해주세요.');
                alert('비밀번호를 확인해 주세요')
                setIsPassword(false);
            } else if(!isPasswordConfirm){
                setPasswordMessage('비밀번호를 확인해주세요.');
                setIsPassword(false);
            } else {
                alert('패스워드 변경이 완료되었습니다.');
                console.log(password)
                navigate('/MyPage');
            }
        } catch (error) {
            console.error('패스워드 변경 도중 에러 발생:', error);
        }
    };

    console.log(isPassword)
    console.log(password)
    console.log(isPasswordConfirm)
    console.log(confirmPassword)



    return (

        <>
            <form>
                <div className="pageTitle"><span>비밀번호 변경</span></div>
                <div className='PW-Container'>
                    <img className="PW-logo-size" src="/images/logo.png" alt="로고이미지" />
                    <div className='PW-Confirm'>새 비밀번호 입력 :
                        <input
                            type={pwType.type}
                            className='PW-Confirm-box'
                            placeholder='비밀번호를 확인해 주세요'
                            name='password'
                            title='password'
                            value={password}
                            onChange={onChangePassword}
                        >
                        </input>

                        <span className='chek-PWShowBtn' onClick={handlePasswordType}>
                      {pwType.visible ? "비밀번호 숨기기" : "비밀번호 보기"}
                  </span>
                        <div className={`message ${!isPassword ? 'PW-Change-error' : password.length > 0 ? 'PW-Change-success' : ''}`}>
                            {passwordMessage}</div>
                        <br />
                        새 비밀번호 확인 :

                        <input
                            type={pwType.type}
                            className='PW-Confirm-box'
                            placeholder='비밀번호를 확인해 주세요'
                            name='confirmPassword'
                            title='confirmPassword'
                            value={confirmPassword}
                            onChange={onChangePasswordConfirm}
                        >
                        </input>

                        <div className={`message ${!isPasswordConfirm ? 'PW-Change-error' : confirmPassword.length > 0 ? 'PW-Change-success' : ''}`}>
                            {passwordConfirmMessage}</div>

                    </div>
                    <div className='buttonBox'>
                        <button type='button' className='PW-Confrim-Btn' onClick={passwordUpdate}>비밀번호 수정</button>
                    </div>
                </div>
            </form>
        </>

    )
}

export default ChangePassword