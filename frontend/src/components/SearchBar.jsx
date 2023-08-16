import { useState } from 'react'
import '/src/scss/Volunteer.scss'
import { IoIosArrowUp } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai'
import RcodeSelect from './RcodeSelect';
import VCodeSelect from './VCodeSelect';
import Calendar from './Calendar';


function SearchBar({ params, setParams, setData }) {

  // const {data} = props;
  const [ onSearchHeader, setOnSearchHeader ] = useState(true);
  const [ onCheck, setOnCheck ] = useState("");


  // 카테고리 헤더 열기닫기 기능
  function handleSearchHeader() {
    setOnSearchHeader(!onSearchHeader);
  }
  // 모집상태 체크박스 선택시 true/false
  function handleCheck(newOnCheck) {
    if(newOnCheck === onCheck) {
      setOnCheck("");
    } else {
      setOnCheck(newOnCheck);
    }
  }

  // 검색 버튼 클릭 이벤트
  const handleSearch = async() => {
    await fetch('/api/list', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...params
      })
    })
    .then(res => res.json())
    .then(res => {
      setData(res);
      console.log(params);
      console.log(res);
    });
  }

  // 초기화 버튼 클릭 이벤트
  const handleSearchInit = () => {
    setParams({
        // numOfRows: 30,
      // pageNo: 5,
      schCateGu: 'all',
      keyword: '',
      schSido: '',
      schSign1: '',
      schupperClCode: '',
      schnanmClCode: '',
      schprogrmBgnde: '',
      progrmEndde: '',
      adultPosblAt: '',
      yngbgsPosblAt: '',
    });
  } 

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
          <div className='table'>
            <div className='tableTr'>
              <div className='trTitle'>봉사분야</div>
              <div className='tableTdField'>
                  <VCodeSelect params={params} setParams={setParams} />
              </div>
            </div>
            <div className='tableTr'>
              <div className='trTitle'>지역</div>
                <div className='tableTd'>
                  <RcodeSelect params={params} setParams={setParams} />
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
              <div className='tableTd'><Calendar params={params} setParams={setParams} /></div>
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
            <div className='tableTr'>
              <div className='trTitle'>검색어</div>
              <div className='keyword'>
                {/* 검색어 */}
                <input type='text' id='keyword' placeholder='봉사' value={params.keyword} onChange={(e) => {
                  setParams({
                    ...params,
                    keyword: e.target.value,
                  })
                }}/>
              </div>
            </div>
          </div>
      </div>
      <button onClick={handleSearch}>검색</button>
      <button onClick={handleSearchInit}>초기화</button>
    </div>
  )
}

export default SearchBar