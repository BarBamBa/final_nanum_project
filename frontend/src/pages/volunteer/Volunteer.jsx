import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import VolunteerList from '../../components/VolunteerList';
import '/src/scss/Volunteer.scss'

function Volunteer() {

  const [params, setParams] = useState({
    numOfRows: 30,
    pageNo: 5,
    keyword: null,
    schCateGu: 'all',
    schSido: null,
    schSign1: null,
    upperClCode: null,
    nanmClCode: null,
    progrmBgnde: null,
    progrmEndde: null,
    adultPosblAt: null,
    yngbgsPosblAt: null,
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
                params,
            })
          });
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => {
          setData(res);
        });
    }, []);

  return (
    <main>
      <div className='pageTitle'>
        봉사활동찾기
      </div>
        { data ? "검색 결과가 없습니다." : data.map((Item, idx) => 
          <SearchBar data={Item} num={idx} key={idx} />
        )}     
      <div>
        { data ? "검색 결과가 없습니다." : data.map((Item, idx) => 
          <VolunteerList data={Item} num={idx} key={idx} />
        )}
      </div>
    </main>
  )
}


export default Volunteer