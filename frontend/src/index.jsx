import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './Admin.jsx'
import Modal from "react-modal";

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import ScrollToTop from './components/ScrollTop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <BrowserRouter >
    <ScrollToTop />
    <Routes>
      <Route path='/*' element={<App />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>

)
// react-modal용 컴포넌트 추가
Modal.setAppElement('#root') //App.js
