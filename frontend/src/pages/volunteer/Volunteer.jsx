import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import '/src/scss/Volunteer.scss'
import VolunteerList from '../../components/VolunteerList'
import MapBox from '../../components/MapBox';

function Volunteer() {

  const [tab, setTab] = useState(true);
  const [params, setParams] = useState({
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
          const res = await fetch('/api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              schCateGu: 'all',
              keyword: '구로구',
            })
          });
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => {
          setData(res);
          console.log('volunteerList:', res);
        });

    }, []);

    useEffect(()=> {
      // console.log('volunteer useEffect:', params);
    }, [params])

  return (
    <main>
      <div className='pageTitle'>
        봉사활동찾기
      </div>     
      <SearchBar params={params} setParams={setParams} setData={setData}/>
      <div className='volunteerTab'>
        <div className={`tabOption ${tab ? 'selected' : ''}`} onClick={() => setTab(true)}>목록보기</div>
        <div className={`tabOption ${tab ? '' : 'selected'}`} onClick={() => setTab(false)}>지도보기</div>
      </div>
      <div className='result'>
        { tab ? 
          <div className='volunteerList'>
            <div className='page'>[전체 {data.length}건, 현재페이지 {1}/{1}]</div>
            { !data ? "검색 결과가 없습니다." : data.map((Item, idx) => 
              <VolunteerList data={Item} num={idx} key={idx} />
            )}
          </div> 
          : 
          <div>
            <MapBox data={data} />
          </div> 
        }
      </div>
    </main>
  )
}

export default Volunteer