import { differenceInDays } from "date-fns"
import { Link, Route, Routes } from "react-router-dom";
import Vdetail from "../pages/volunteer/Vdetail";


function VolunteerList (props) {

    function stringToDate(str) {
        const string = str + "";
        const year = string.substring(0, 4);
        const month = string.substring(4, 6);
        const date = string.substring(6, string.length);
        return new Date(year + "-" + month + "-" + date);
    }

    function stringFormat(str) {
        const string = str + "";
        const year = string.substring(0, 4);
        const month = string.substring(4, 6);
        const date = string.substring(6, string.length);
        return year + "-" + month + "-" + date;
    }

    const data = {
        progrmRegistNo : props.data.progrmRegistNo,
        progrmSttusSe : props.data.progrmSttusSe,
        title : props.data.progrmSj,
        organization : props.data.nanmmbyNm,
        recruit : stringFormat(props.data.noticeBgnde) + " ~ " + stringFormat(props.data.noticeEndde),
        period : stringFormat(props.data.progrmBgnde) + " ~ " + stringFormat(props.data.progrmEndde),
        category : props.data.srvcClCode,
    }

    const today = new Date();
    const endDate = stringToDate(props.data.noticeEndde);
    const leftDate = differenceInDays(endDate, today);

    return (
        <div className='volunteerListBox'>
            <div className='listState'>{data.progrmSttusSe == '1' ? '모집대기 '
                                        : data.progrmSttusSe == '2' ? '모집중 ' : '모집완료 '}                  
            </div>
            <Link to={'/vdetail/' + `${data.progrmRegistNo}`} state={{ progrmRegistNo : data.progrmRegistNo }}>
                <div className='listTitle'>{data.title}</div>
            </Link>
            <div className='listDetail1'>
                <span><strong>모집기관</strong> : {data.organization + "  "}</span>
                <span><strong>모집기간</strong> : {data.recruit + "  "}</span>                            
            </div>
            <div className='listDetail2'>
                <span><strong>봉사기간</strong> : {data.period}</span>
                <span><strong>봉사분야</strong> : {data.category}</span>
            </div>
            <div className='listDate'> 
                <strong className={data.progrmSttusSe != '3' ? (leftDate > 5 ? 'listDateNum' : 'listDateNum end') : 'listDateNum end'}>
                    {data.progrmSttusSe == '3' ? '마감' : leftDate}
                </strong>
                {data.progrmSttusSe == '3' ? '' : '일후 마감'}
            </div>
            <Routes>
                <Route path='/vdetail/' data={data.progrmRegistNo} element={<Vdetail />}></Route>
            </Routes>
        </div>
        
    )
}

export default VolunteerList