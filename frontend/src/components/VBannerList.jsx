import React from 'react';
import { Form, Link, Route, Routes } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import '/src/scss/VolunteerBanner.scss'
import Vdetail from '../pages/volunteer/Vdetail';
function VBannerList (props) {

    const data = {
        progrmRegistNo : props.data.progrmRegistNo,
        region : props.data.sidoCd,
        title : props.data.progrmSj,
        recruit : props.data.noticeBgnde + " ~ " + props.data.noticeEndde,
        period : props.data.progrmBgnde + " ~ " + props.data.progrmEndde,
        category : props.data.srvcClCode,
    }

    return (
        <div className='vBannerList'>
            <div className='region'>{data.region}</div>
            <div className='titleBox'>
                <div className='title'>{data.title}</div>
            </div>
            <div className='detailBox'>
                <div className='recruitmentPeriod'>모집기간 : {data.recruit}</div>
                <div className='recruitmentKind'>봉사분야 : {data.category}</div>
                <div className='volunteerPeriod'>봉사기간 : {data.period}</div>
            </div>
            <div className='goToVolunteer'>
                <Link to={'/vdetail/' + `${data.progrmRegistNo}`} state={{ progrmRegistNo : data.progrmRegistNo }} className='goToVolunteer'>
                    상세보기
                    <IoIosArrowForward className='arrowFoward'/>
                </Link>
            </div>
            <Routes>
                <Route path='/volunteer/vol=' data={data.progrmRegistNo} element={<Vdetail />} ></Route>
            </Routes>
        </div>
        
    )
}

export default VBannerList;