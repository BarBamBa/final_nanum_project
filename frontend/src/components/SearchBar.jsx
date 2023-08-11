import React, { useState, useEffect } from 'react'
import '/src/scss/Volunteer.scss'
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai'
import VCodeSelect from './VCodeSelect';
import RcodeSelect from './RcodeSelect';

function SearchBar() {

  const [ onSearchHeader, setOnSearchHeader ] = useState(true);
  const [ onCheck, setOnCheck ] = useState(false);

  function handleSearchHeader() {
    setOnSearchHeader(!onSearchHeader);
  }

  function handleCheck() {
    setOnCheck(!onCheck);
  }

  
  return (
    <div className='searchBar'>
      <div className='searchHeader' onClick={handleSearchHeader}>
        {onSearchHeader ? "검색목록 닫기" : "검색목록 열기"}
        <IoIosArrowUp 
          className= {`searchArrow ${onSearchHeader ? '' : 'down'}`}
          
        />
      </div>
      <div className={`searchContents ${onSearchHeader ? '' : 'closed'}`}>
        <table>
          <tbody>
            <tr>
              <th>봉사분야</th>
              <td>
                  <VCodeSelect />   
              </td>
            </tr>
            <tr>
              <th>지역</th>
                <td>
                  <RcodeSelect />
                </td>
              <th>봉사자유형</th>
                <td></td>
            </tr>
            <tr>
              <th>봉사기간</th>
                <td></td>
            </tr>
            <tr>
              <th>모집상태</th>
                <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <button onClick={none}>찾기</button>
      <button onClick={none}>초기화</button> */}
    </div>
  )
}

export default SearchBar