import React, { useState, useEffect } from 'react'
import { Form, Link } from 'react-router-dom';
import '../scss/VolunteerBanner.scss'
import { BsPlusLg } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import VBannerList from './VBannerList';

function VolunteerBanner() {

  const [data, setData] = useState([]);

  useEffect(() => {
		const fetchData = async() => {
          const res = await fetch('/api/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
          });
          const result = res.json();
          return result;
        }	
        
        fetchData().then(res => {
          setData(res);
        });
    }, []);

  return (
    <>
      <div className='vBannerBackground'>
        <div className='vBannerTitle'>모집중인 자원봉사</div>
        <div className='toVolunteerPage'><Link to='/volunteer' className='toVolunteerPage'><BsPlusLg />더보기</Link></div>      
        <div className='vBannerListBox'>
          {/* 온클릭 넣을거 */}
          <p><IoIosArrowBack className='vArrowBack' /></p>
            {data.map((item, idx) => 
            <VBannerList data={item} num={idx} key={idx} />
          )}   
          <p><IoIosArrowForward className='vArrowForward' /></p>
        </div>
        
      </div>
    </>
  )
}

export default VolunteerBanner