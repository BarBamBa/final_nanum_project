import { useContext, useEffect } from 'react'

const Oauth2Callback = () => {

    const oauth2LoginHandler = () => {
        const url = new URL(window.location.href);
        console.log(url);
        const accessToken = url.searchParams.get("accessToken");
        const tokenExpiresIn = url.searchParams.get("tokenExpiresIn");
        const refreshToken = url.searchParams.get("refreshToken");
        console.log(accessToken, tokenExpiresIn, refreshToken);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("tokenExpiresIn", tokenExpiresIn);
        localStorage.setItem("refreshToken", refreshToken);
        console.log(localStorage);
        
        document.location.href = "/";
    };
    useEffect(() =>{oauth2LoginHandler()}, []);

  return (
    <>
    </>
  )
}

export default Oauth2Callback;
