import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropbox from '../Dropbox';
import UtilWrap from '../UtilWrap';
import '/src/scss/Header.scss';

function Header() {
  return (
      <header>
        <div className='navBar'>
          <div className='logoWrap'>
            <Link to='/'><img id='logoImg' src="/images/logo.png" alt="로고이미지" /></Link>
          </div>
          <Dropbox />
          <UtilWrap />
        </div>
      </header>
  )
}

export default Header;