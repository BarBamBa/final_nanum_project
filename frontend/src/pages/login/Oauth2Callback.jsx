import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenCheck } from "../../components/TokenCheck";

const Oauth2Callback = () => {

  const props = useContext(TokenCheck);
  const navigate  = useNavigate();

    const oauth2LoginHandler = () => {
        const url = new URL(window.location.href);
        const accessToken = url.searchParams.get("accessToken");
        const tokenExpiresIn = url.searchParams.get("tokenExpiresIn");
        const refreshToken = url.searchParams.get("refreshToken");

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("tokenExpiresIn", tokenExpiresIn);
        localStorage.setItem("refreshToken", refreshToken);
        document.location.href = "/";
    };
    useEffect(() =>{oauth2LoginHandler()}, []);

  return (
    <>
    </>
  )
}

export default Oauth2Callback;
