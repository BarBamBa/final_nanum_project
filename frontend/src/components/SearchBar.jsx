import React, { useState, useEffect } from 'react'
import '/src/scss/Volunteer.scss'
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai'
import RcodeSelect from './RcodeSelect';
import VCodeSelect from './VCodeSelect';
import Calendar from './Calendar';


function SearchBar(props) {

  const {data} = props;
  const [ onSearchHeader, setOnSearchHeader ] = useState(true);
  const [ onCheck, setOnCheck ] = useState("");


  //카테고리 헤더 열기닫기 기능
  function handleSearchHeader() {
    setOnSearchHeader(!onSearchHeader);
  }
  //봉사분야 체크박스 선택시 true/false
  function handleCheck(newOnCheck) {
    if(newOnCheck === onCheck) {
      setOnCheck("");
    } else {
      setOnCheck(newOnCheck);
    }
  }

  function handleReset() {
    return;
  }

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
        <span onClick={handleSearchHeader}>{onSearchHeader ? "검색목록 닫기" : "검색목록 열기"}
        <IoIosArrowUp 
          className= {`searchArrow ${onSearchHeader ? '' : 'down'}`}
        />
        </span>
      </div>
      <div className={`searchContents ${onSearchHeader ? '' : 'closed'}`}>
          <div className='table'>
            <div className='tableTr'>
              <div className='trTitle'>봉사분야</div>
              <div className='tableTdField'>
                  <VCodeSelect />
              </div>
            </div>
            <div className='tableTr'>
              <div className='trTitle'>지역</div>
                <div className='tableTd'>
                  <RcodeSelect />
                </div>
              <div className='trTitle'>봉사자유형</div>
              <div className='tableTd'>
                <div className='checkboxCustom'>
                  {/* 성인체크박스 */}
                  <input type='checkbox' id='adult' />
                  <label htmlFor="adult"></label>
                  <span>성인</span>
                  {/* 청소년체크박스 */}
                  <input type='checkbox' id='student' />
                  <label htmlFor="student"></label>
                  <span>청소년</span>
                </div>
              </div>  
            </div>
            <div className='tableTr'>
              <div className='trTitle'>봉사기간</div>
              <div className='tableTd'><Calendar/></div>
            </div>
            <div className='tableTr'>
              <div className='trTitle'>모집상태</div>
              <div className='status' colSpan='3'>
                {/* 모집대기버튼 */}
                <input type='checkbox' id='statusWait' checked={onCheck  === 'wait'} readOnly/>
                <label htmlFor='statusWait' onClick={() => handleCheck('wait')}>모집대기</label>
                {/* 모집중버튼 */}
                <input type='checkbox' id='statusIng' checked={onCheck  === 'ing'} readOnly/>
                <label htmlFor='statusIng' onClick={() => handleCheck('ing')}>모집중</label>
                {/* 모집완료버튼 */}
                <input type='checkbox' id='statusDone' checked={onCheck  === 'done'} readOnly/>
                <label htmlFor='statusDone' onClick={() => handleCheck('done')}>모집완료</label>
              </div>
            </div>
          </div>
          <div className='btnBox'>
            <button onClick={handleSearch} id='btnSearch'>찾기</button>
            <button onClick={handleReset} id='btnReset'>초기화</button>
          </div>
      </div>
    </div>
  )
}

export default SearchBar