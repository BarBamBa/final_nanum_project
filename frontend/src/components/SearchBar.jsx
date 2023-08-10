import React, { useState, useEffect } from 'react'
import '/src/scss/Volunteer.scss'
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai'
import RcodeSelect from './RcodeSelect';
import VCodeSelect from './VCodeSelect';


function SearchBar() {

  const [ onSearchHeader, setOnSearchHeader ] = useState(true);
  const [ onCheck, setOnCheck ] = useState(false);


  //카테고리 헤더 열기닫기 기능
  function handleSearchHeader() {
    setOnSearchHeader(!onSearchHeader);
  }
  //봉사분야 체크박스 선택시 true/false
  function handleCheck() {
    setOnCheck(!onCheck);
    console.log(onCheck);
  }

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSearchOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) => {
      for (const option in searchOptions) {
        if (searchOptions[option] && !item[option].includes(searchOptions[option])) {
          return false;
        }
      }
      return true;
    });

    onSearch(filteredData);
  };

  return (
    <div className='searchBar'>
      <div className='searchHeader'>
        {onSearchHeader ? "검색목록 닫기" : "검색목록 열기"}
        <IoIosArrowUp 
          className= {`searchArrow ${onSearchHeader ? '' : 'down'}`}
          onClick={handleSearchHeader}
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
                <td>
                </td>
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