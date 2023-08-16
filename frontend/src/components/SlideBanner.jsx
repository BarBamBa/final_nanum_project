import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import '/src/scss/SlideBanner.scss'

function SlideBanner() {
  const slides = [
    '/images/banner-slide1.jpg',
    '/images/banner-slide2.jpg',
    '/images/banner-slide3.jpg',
    '/images/banner-slide4.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // 슬라이드 자동 재생을 위한 타이머 설정
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='slide-banner'>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        ></div>
      ))}
      <div className='bannerTitleBox'>
        <div className='bannerTitle'>작은 나눔이 모여 큰 희망으로</div>
        <div className='bannerToVolunteer'><Link to='/volunteer'>나눔하러가기<BiArrowToRight className='arrowRight' /></Link></div>
      </div>
      <div className='dots'>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default SlideBanner