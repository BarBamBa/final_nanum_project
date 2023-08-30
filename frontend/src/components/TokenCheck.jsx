import React, { createContext, useContext, useState, useEffect } from 'react';

export const TokenCheck = createContext();

// 커스텀 훅을 정의하고 내보내는 코드
export const useToken = () => useContext(TokenCheck);

// children은 TokenCheckProvider가 App.js에서 감싼 자식 컴포넌트들을 말한다
export const TokenCheckProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);


  useEffect(() => {
    if (isLogin) {
      fetch('/api/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        })
        .then((data) => {
          if (data) {
            setUserId(data.id);
            localStorage.setItem("nickname", data.nickname);
          }
        })
        .catch((error) => {
          console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [isLogin]);

// 위에서 useState로 생성한 isLogin과 useId의 변수 값
  const UserTokenValue = {
    isLogin,
    userId,
  };


  return (
    <TokenCheck.Provider value={UserTokenValue}>
      {children}
    </TokenCheck.Provider>
  );

};

export default TokenCheckProvider;