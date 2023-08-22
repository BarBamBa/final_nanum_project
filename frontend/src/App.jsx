import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Main from './pages/Main';
import About from './pages/about/About';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import MyPage from './pages/myPage/MyPage';
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
import './scss/App.scss'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path="/manager/*" element={<Manager/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
