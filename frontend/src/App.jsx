import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Main from './pages/Main';
import About from './pages/about/About';
import Board from './pages/board/Board';
import Login from './pages/login/Login';
import Manager from './pages/manager/Manager';
import MyPage from './pages/myPage/MyPage';
import Qna from './pages/qna/Qna';
import SignUp from './pages/signUp/SignUp';
import Volunteer from './pages/volunteer/Volunteer';
import Vdetail from './pages/volunteer/Vdetail';
// import BoardDetail from './pages/board/BoardDetail';
// import BoardInputForm from './components/BoardInputForm';

import './scss/App.scss'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path="/about" element={<About/>} /> 
        <Route path="/volunteer" element={<Volunteer/>} />
        <Route path="/board/*" element={<Board/>} />
        {/* <Route path='/board/detail/:id' element={<BoardDetail/>} />
        <Route path='/board/input' element={<BoardInputForm/>} /> */}
        <Route path="/mypage/*" element={<MyPage/>} />
        <Route path="/qna/*" element={<Qna/>} />
        <Route path="/login/*" element={<Login/>} />
        <Route path="/signup/*" element={<SignUp/>} />
        <Route path="/manager/*" element={<Manager/>} /> 
      </Routes>
      <Footer />
    </>
  )
}

export default App
