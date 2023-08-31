import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Admin from './Admin.jsx'
import 'react-datepicker/dist/react-datepicker.css'
import Modal from "react-modal";
import TokenCheckProvider from './components/TokenCheck.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import ScrollToTop from './components/ScrollTop.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  // <TokenCheckProvider basename={process.env.VITE_PUBLIC_URL}>
  <TokenCheckProvider>
    <BrowserRouter >
      <ScrollToTop />
      <Routes>
        <Route path='/*' element={<App />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </TokenCheckProvider>




  // </React.StrictMode>


)
// react-modal용 컴포넌트 추가
Modal.setAppElement('#root') //App.js
