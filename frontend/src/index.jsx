import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import Header from './components/layouts/Header.jsx'
import Footer from './components/layouts/Footer.jsx'
import About from './pages/about/About.jsx'
import Main from './pages/Main.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Header />
      <Routes>
        <Route path="/template1-project" element={<Main />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/volunteer" component={Volunteer} />
        <Route path="/notice" component={NoticeBoard} />
        <Route path="/news" component={NewsBoard} />
        <Route path="/board" component={FreeBoard} />
        <Route path="/review" component={ReviewBoard} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/mypage/volunteerList" component={MyVolunteerList} />
        <Route path="/mypage/wishList" component={Wishlist} />
        <Route path="/qna" component={Qna} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
