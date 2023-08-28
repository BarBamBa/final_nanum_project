import { useMemo, useState } from 'react'
import '../scss/CalenderReserve.scss'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns"
import {ko} from 'date-fns/locale';
import { useLocation, Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from'react-icons/io';

function CalendarReserve({sendDataToReserve}) {

  function stringToDate(str) {
    const string = str + "";
    const year = string.substring(0, 4);
    const month = string.substring(4, 6);
    const date = string.substring(6, string.length);
    return new Date(year + "-" + month + "-" + date);
  }

  //봉사 데이터 가져오기
  const location = useLocation();
  const data = location.state.data;
  const startDate = data.progrmBgnde;
  const endDate = data.progrmEndde;

  //요일
  const dayNames = [
    '월', '화', '수', '목', '금', '토', '일',
  ]

  // js getDay 요일
  const getDays = [
    '일', '월', '화', '수', '목', '금', '토', 
  ]

  // 선택 가능 요일 문자배열
  const actDay = location.state.data.actWkdy.split(" ");

  // 선택 가능 요일 숫자 치환
  function setDays() {
    for(let i=0; i<actDay.length; i++) {
      for(let j=0; j<getDays.length; j++) {
        if(i === actDay.length-1) {
          actDay[i] !== getDays[j] && getDays[j] !== 1 ? getDays[j] = 0 : getDays[j] = 1;
          continue;
        }
        if(actDay[i] === getDays[j]) {
          getDays[j] = 1;
          continue;
        }
      }
    }
  };

  setDays();

  //날짜
  let today = startOfToday()
  //이번달
  let [currentMonth, setCurrentMonth] = useState(format(today, "yyyy-MM"))
  //선택한 날짜
  const [selectedDay, setSelectedDay] = useState(today);
  let firstDayCurrentMonth = parse(currentMonth, "yyyy-MM", new Date())
  let days = useMemo(() => eachDayOfInterval({
    //시작일 구하기
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    //마지막날 구하기
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  }), [firstDayCurrentMonth])

  //이전달
  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "yyyy-MM", {locale:ko}))
  }
  //다음달
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "yyyy-MM", {locale:ko}))
  }

  const [ sendData, setSendData ] = useState({
    selectedDay : selectedDay,
    data: data
  });
  //선택 날짜 전달 함수
  const sendDatas = () => {
    sendDataToReserve({
      selectedDay: selectedDay, // 변경된 selectedDay 값을 보냄
      data: data
    });
  }
  return (
    <>
      <div className='calender'>
        <div className='btnSelectBox'>
          <Link to={`/vdetail/${data.progrmRegistNo}`} state={{progrmRegistNo: data.progrmRegistNo}}><button className='btnBack'>뒤로가기</button></Link>
          <button onClick={sendDatas} className='btnSelectDate'>날짜선택완료</button>
        </div>
        <header>
          <IoIosArrowBack 
            onClick={prevMonth} 
            className='monthChangebutton'
            disabled={isThisMonth(new Date(currentMonth))}
          />
            <h1>{format(firstDayCurrentMonth, " yyyy MM", {locale:ko})}</h1>
          <IoIosArrowForward onClick={nextMonth} className='monthChangebutton'/>
        </header>
        <div className='calendarBody'> 
          <div className='day'>
            {/* 요일 */}
            {dayNames.map((day, i) =>
            {
              return(
              <div
                key={i}
              >
                {day}
              </div>
            )})}
            </div>
            <div className="calendarDate">
            {days.map((day, dayIdx) => {
              return (
                <div
                  key={day.toString()}
                  className={
                    isEqual(day, selectedDay) && isSameMonth(day, firstDayCurrentMonth) ? 
                          isEqual(day, today) ? "dateLabelBox" :
                              isAfter(day, stringToDate(endDate)) ? "dateLabelBox" : 
                                isBefore(day,stringToDate(startDate)) ? "dateLabelBox" : 
                                  getDays[day.getDay()] !== 1 ? "dateLabelBox" : "dateLabelBox selectedDay"
                    : ''
                    ||
                    !isBefore(day, today) ? 'dateLabelBox' : "dateLabelBox before"
                  }
                >
                  <label 
                    id="dateLabel"
                    onClick={() => {
                      isBefore(day, today) ? '' : setSelectedDay(day) ||
                      isAfter(day, today) ? setSelectedDay(day) : ''
                      console.log("선택날짜:" + selectedDay);
                    }}
                    className={
                      isEqual(day, today) ? "dateLabel today" : "" ||
                      isBefore(day, today) ? "dateLabel before" : "" ||
                      !isSameMonth(day, firstDayCurrentMonth) ? 'dateLabel before' : '' ||
                      !isBefore(day, today) ? "dateLabel" : ""
                    }   
                    >
                      <button 
                        id="dateLabel" 
                        disabled={isBefore(day, today)}
                      />
                      <time
                        dateTime={format(day, "yyyy-MM-dd", {locale:ko})}
                      >
                        {format(day, "d")}
                      </time>
                        { 
                        isAfter(today, stringToDate(startDate)) ? 
                          isAfter(day, today) && isBefore(day, stringToDate(endDate)) && getDays[day.getDay()] === 1 ? 
                          <p className='reserveTime'>
                              시작시간: {data.actBeginTm}시      종료시간: {data.actEndTm}시
                          </p> : '' 
                          :
                          isAfter(day, stringToDate(startDate)) && isBefore(day, stringToDate(endDate)) && getDays[day.getDay()] === 1 ? 
                          <p className='reserveTime'>
                              시작시간: {data.actBeginTm}시      종료시간: {data.actEndTm}시
                          </p> : ''
                        }
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarReserve