import { useState } from 'react'
import './scss/App.scss'
import Main from './pages/Main'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

function App() {

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App
