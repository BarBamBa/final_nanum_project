import React from 'react';
import { Form, Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
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
            <div className='title'>{data.title}</div>
            {/* <div className='recruitmentPeriod'>모집기간 : {data.recruit}</div>
            <div className='recruitmentNumber'>{data.category}</div>
            <div className='volunteerPeriod'>봉사기간 : {data.period}</div> */}
            <div className='goToVolunteer'><Link to={'/vdetail/' + `${data.progrmRegistNo}`} state={{ progrmRegistNo : data.progrmRegistNo }} className='goToVolunteer'>상세보기<IoIosArrowForward className='arrowFoward'/></Link></div>
        </div>
    )
}

export default VBannerList;