import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import '/src/scss/Volunteer.scss'
import VolunteerList from '../../components/VolunteerList'
import MapBox from '../../components/MapBox';
import useIntersectionObserver from '../../components/hooks/useIntersectionObserver';

function Volunteer() {

  const [tab, setTab] = useState(true);
  const [onCheck, setOnCheck] = useState(2);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [params, setParams] = useState({
    numOfRows: '10',
    pageNo: '1',
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
  const [data, setData] = useState([]);

  // 모집상태 체크박스 선택시 true/false
  function handleCheck(newOnCheck) {
    if(newOnCheck === onCheck) {
      setOnCheck('');
    } else {
      setOnCheck(newOnCheck);
    }
  }

  // useIntersectionObserver을 통해 fetchData 함수 동작 시
  const fetchData = async() => {
    await fetch('/api/list', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...params,
        pageNo: "" + page,
      })
    })
    .then(res => res.json())
    .then(res => {
      setCount(res.totalCount);
      if(data.lenth + 9 >= count) {
        setMoreData(false);
        return;
      }
      setData((prev) => prev.concat(res.items.item));
      setPage((prev) => prev + 1); 
    })
    .catch((error) => {
      setMoreData(false);
      throw error;
    });
  };

  const target = useIntersectionObserver(async (entry, observer) => {
    if(!moreData || !tab) {
      return;
    }
    observer.unobserve(entry.target);
    await fetchData();
    observer.observe(entry.target);
  }, {});

  useEffect(()=> {
  }, [params])

  return (
    <main>
      <div className='pageTitle'>
        <span>봉사활동찾기</span>
      </div>     
      <SearchBar params={params} setParams={setParams} setData={setData} setMoreData={setMoreData} setCount={setCount} setPage={setPage} onCheck={onCheck} handleCheck={handleCheck} />
      <div className='volunteerTab'>
        <div className={`tabOption ${tab ? 'selected' : ''}`} onClick={() => setTab(true)}>목록보기</div>
        <div className={`tabOption ${tab ? '' : 'selected'}`} onClick={() => setTab(false)}>지도보기</div>
      </div>
      <div className='result'>
        { tab ? 
          <div className='volunteerList'>
            <div className='page'>[전체 {count}건]</div>
            { data.length < 1 ? "검색 결과가 없습니다." : data.map((Item, idx) => 
              Item.progrmSttusSe === onCheck && <VolunteerList data={Item} num={idx} key={idx} />
            )}
          </div> 
          : 
          <div className='mapBox'>
            <MapBox data={data} />
          </div> 
        }
        <div className={`loader ${tab ? 'selected' : ''}`} ref={target}>{ tab ? 'Loading...' : '※ 검색결과는 상위 5개 항목만 표시됩니다.'}</div>
      </div>
    </main>
  )
}

export default Volunteer