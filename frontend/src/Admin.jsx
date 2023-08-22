import React from 'react'
import AdHeader from './components/layouts/AdHeader'
import AdBoard from './pages/admin/AdBoard';
import AdReply from './pages/admin/AdReply';
import AdUser from './pages/admin/AdUser';
import AdQna from './pages/admin/AdQna';
import AdVolunteer from './pages/admin/AdVolunteer';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

function Admin() {
    return (
        <div>
            <AdHeader />
            <Routes>
                <Route path='' element={<AdBoard />} />
                <Route path='reply' element={<AdReply />} />
                <Route path='user' element={<AdUser />} />
                <Route path='qna' element={<AdQna />} />
                <Route path='volunteer' element={<AdVolunteer />} />
            </Routes>
        </div>
    )
}

export default Admin