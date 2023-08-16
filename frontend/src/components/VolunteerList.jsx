import { differenceInDays } from "date-fns"

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
        <div className='volunteerBox'>
            <div className='categoryItem'>{data.progrmSttusSe == '1' ? '모집대기 '
                                        : data.progrmSttusSe == '2' ? '모집중 ' : '모집완료 '}
                                        ({data.category})
            </div>
            <div className='categoryItem'>{data.title}</div>
            <div className='categoryItem'>[모집기관] {data.organization + "  "}
                                        [모집기간] {data.recruit + "  "}
                                        [봉사기간] {data.period}
            </div>
            <div className='categoryItem'>마감{leftDate}일전</div>
        </div>
    )
}

export default VolunteerList