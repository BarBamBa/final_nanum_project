import { useState } from 'react'
import './scss/App.scss'
import Main from './pages/Main'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import {Route, Routes} from 'react-router-dom';
import About from './pages/about/About';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import FindUser from './pages/login/FindUser';
import Manager from './pages/manager/Manager';
import MyPage from './pages/myPage/MyPage';
import MyVolunteer from './pages/myPage/MyVolunteer';
import VolunteerSpec from './pages/myPage/VolunteerSpec';
import VolunteerReview from './pages/myPage/VolunteerReview';
import WishList from './pages/myPage/WishList'
import Qna from './pages/qna/Qna';
import SignUp from './pages/signUp/SignUp';
import Test from './pages/signUp/Test';
import Volunteer from './pages/volunteer/Volunteer';
import VolunteerHeaders from './pages/myPage/VolunteerHeaders';


function App() {

  return (
    <>
      <Header />
     
      <Routes>
        <Route path="/" element={<Main/>} /> 
        <Route path="/about" element={<About/>} /> 
        <Route path="/volunteer/*" element={<Volunteer/>} />
        <Route path="/board/*" element={<Board/>} />
        <Route path="/mypage/*" element={<MyPage/>} />
        <Route path="/MyVolunteer/*" element={<MyVolunteer/>} />
        <Route path="/VolunteerSpec/*" element={<VolunteerSpec/>} />
        <Route path="/VolunteerReview/*" element={<VolunteerReview/>} />
        <Route path="/VolunteerHeaders/*" element={<VolunteerHeaders/>} />
        <Route path="/WishList/*" element={<WishList/>} />
        <Route path="/qna/*" element={<Qna/>} />
        <Route path="/login/*" element={<Login/>} />
        <Route path="/FindUser/*" element={<FindUser/>} />
        <Route path="/Signup/*" element={<SignUp/>} />
        <Route path="/Test/*" element={<Test/>} />
        <Route path="/manager/*" element={<Manager/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
