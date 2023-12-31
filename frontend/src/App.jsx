import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Main from './pages/Main';
import About from './pages/about/About';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import MyPage from './pages/myPage/MyPage';
import MypageModify from './pages/myPage/MypageModify';
import Qna from './pages/qna/Qna';
import SignUp from './pages/signUp/SignUp';
import Volunteer from './pages/volunteer/Volunteer';
import Vdetail from './pages/volunteer/Vdetail';
import BoardDetail from './pages/board/BoardDetail';
import BoardInputForm from './components/BoardInputForm'
import FindUser from './pages/login/FindUser';
import MyVolunteer from './pages/myPage/MyVolunteer';
import VolunteerSpec from './pages/myPage/VolunteerSpec';
import VolunteerReview from './pages/myPage/VolunteerReview';
import WishList from './pages/myPage/WishList'
import VolunteerHeaders from './pages/myPage/VolunteerHeaders';
import Reserve from './pages/volunteer/Reserve';
import QnaDetail from './pages/qna/QnaDetail';
import QnaInputForm from './components/QnaInputForm';
import './scss/App.scss'
import ScrollTopButton from './components/ScrollTopButton';
import PasswordConfirm from './pages/myPage/PasswordConfirm';
import Oauth2Callback from './pages/login/Oauth2Callback';
import ChangePassword from './pages/myPage/ChangePassword';
import axios from 'axios';

function App() {
// axios.defaults.baseURL = VITE_API_GATEWAY_HOST;
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/volunteer/*" element={<Volunteer />} />
        <Route path="/vdetail/*" element={<Vdetail />} />
        <Route path="/reserve/*" element={<Reserve />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/MyVolunteer/*" element={<MyVolunteer />} />
        <Route path="/VolunteerSpec/*" element={<VolunteerSpec />} />
        <Route path="/VolunteerReview/*" element={<VolunteerReview />} />
        <Route path="/VolunteerHeaders/*" element={<VolunteerHeaders />} />
        <Route path='/board/detail/:id' element={<BoardDetail />} />
        <Route path='/board/input' element={<BoardInputForm />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/MypageModify/*" element={<MypageModify />} />
        <Route path="/WishList/*" element={<WishList />} />
        <Route path="/qna/*" element={<Qna />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/FindUser/*" element={<FindUser />} />
        <Route path='/PasswordConfirm/*' element={<PasswordConfirm />} />
        <Route path='/ChangePassword/*' element={<ChangePassword />} />
        <Route path="/signup/*" element={<SignUp />} />
        <Route path="/qna/detail/:id" element={<QnaDetail />} />
        <Route path="/qna/input" element={<QnaInputForm />} />
        <Route path="/oauth2login/callback" element={<Oauth2Callback />} />
      </Routes>
      <ScrollTopButton />
      <Footer />
    </>
  )
}

export default App
