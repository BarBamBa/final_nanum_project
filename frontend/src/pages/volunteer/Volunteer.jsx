import React from 'react'
import SearchBar from '../../components/SearchBar'
import '/src/scss/Volunteer.scss'
import Vdetail from './Vdetail'

function Volunteer() {
  return (
    <main>
      <div className='pageTitle'>
        봉사활동찾기
      </div>     
      <SearchBar />
    </main>
  )
}

export default Volunteer