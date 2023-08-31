import React from 'react'
import { useContext, useEffect, useState } from 'react';
import AdHeader from './components/layouts/AdHeader'
import AdBoard from './pages/admin/AdBoard';
import AdUser from './pages/admin/AdUser';
import AdQna from './pages/admin/AdQna';
import AdVolunteer from './pages/admin/AdVolunteer';
import AdLogin from './components/admin/AdLogin';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { TokenCheck } from './components/TokenCheck';

function Admin() {
    const userInfo = useContext(TokenCheck);
    console.log(userInfo.userId);
    console.log(userInfo.auth);
    console.log(userInfo.isLogin);

    const [isLogin, setIsLogin] = useState(false);
    const [auth, setAuth] = useState(null);

    console.log("isLogin : ",isLogin);
    console.log("auth : ",auth);


    return (
        (isLogin == true && auth == "ROLE_ADMIN") || userInfo.auth == "ROLE_ADMIN" && userInfo.isLogin == true ? (
            <div>
                <AdHeader setIsLogin={setIsLogin}/>
                <Routes>
                    <Route path='' element={<AdBoard />} />
                    <Route path='user' element={<AdUser />} />
                    <Route path='qna' element={<AdQna />} />
                    <Route path='volunteer' element={<AdVolunteer />} />
                </Routes>
            </div>
        ) : < AdLogin  setIsLogin={setIsLogin} setAuth={setAuth} />


    )
}

export default Admin