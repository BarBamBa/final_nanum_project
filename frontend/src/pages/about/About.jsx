import React, { useEffect, useState } from 'react';
import '/src/scss/About.scss'
import { IoIosSearch, IoIosList, IoIosChatboxes } from 'react-icons/io';

function About() {

    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        const yOffset = window.pageYOffset;
        const targetElement = document.getElementById('targetElement');
        const targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
  
        if (yOffset > targetOffset - 550) {
          setVisible(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
      const elementToAnimate = document.querySelector('#aboutText');
      elementToAnimate.classList.add('animationClass');
    }, []);

  return (
    <>
      <div id="aboutText">
        <div>늘 마음뿐이던 자원봉사</div>
        <div>이젠 "나눔"과 함께하세요</div>
      </div>
      <div className={`iconBox scrollAnimate ${visible ? 'visible' : ''}`} id='targetElement'>
        <div className='iconList1'>
          <IoIosSearch />
          <p>내게 맞는 자원봉사 활동을</p> 
          <p>검색할 수 있습니다</p>
        </div>
        <div className='iconList2'>
          <IoIosList />
          <p>조회하기 힘들었던 자원봉사내역</p>
          <p>쉽게 찾아 볼 수 있습니다</p>
        </div>
        <div className='iconList3'>
          <IoIosChatboxes />
          <p>자원봉사자들과 게시판을 통해</p>
          <p>소통할 수 있습니다</p>
        </div>
      </div>
      <div className={`imgBox scrollAnimate ${visible ? 'visible' : ''}`} id='targetElement'>
        <img src='/images/circle.png' />
      </div>
    </>
  )
}

export default About;