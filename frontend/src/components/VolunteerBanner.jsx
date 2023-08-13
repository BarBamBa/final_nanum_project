import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
            body: JSON.stringify({
              keyword: '',
            })
          });
          const result = await res.json();
          return result;
        }	
        
        fetchData().then(res => {
          setData(res);
        });
    }, []);

  const CustomPrevArrow = ({ currentSlide, slideCount, ...props }) => (
    <div {...props} className="custom-prev-arrow">
      <IoIosArrowBack className='vArrowBack' />
    </div>
  );

  const CustomNextArrow = ({ currentSlide, slideCount, ...props }) => (
    <div {...props} className="custom-next-arrow">
      <IoIosArrowForward className='vArrowForward' />
    </div>
  );

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />, // 이전 화살표 컴포넌트
    nextArrow: <CustomNextArrow />, // 다음 화살표 컴포넌트
  };

  return (
    <>
      <div className='vBannerBackground'>
        <div className='vBannerTitle'>모집중인 자원봉사</div>
        <div className='toVolunteerPage'>
          <Link to='/volunteer' className='toVolunteerPage'>
            <BsPlusLg />더보기
          </Link>
        </div>
        <Slider {...settings}>
            {data.map((item, idx) => (
              <VBannerList data={item} num={idx} key={idx} />
            ))}
        </Slider>
      </div>
    </>
  )
}

export default VolunteerBanner