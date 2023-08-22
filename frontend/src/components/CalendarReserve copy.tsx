import { useMemo, useState } from "react"
import { cn, dayNames } from "../lib/utils" 
import {
  add,
  addDays,
  addHours,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  parseISO,
  set,
  startOfDay,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from "date-fns"
import {ko} from 'date-fns/locale';
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { useLocation } from 'react-router-dom';
import '../scss/calendarReserve.scss'

const reservations = [
  addHours(startOfToday(), 5).toString(),
  addHours(startOfToday(), 6).toString(),
  addHours(startOfToday(), 7).toString(),
  addHours(startOfToday(), 8).toString(),
  addHours(startOfToday(), 9).toString(),
  addDays(new Date(addHours(startOfToday(), 4)), 3).toString(),
]

export default function CalendarReserve() {
  //봉사활동 상세페이지에서 data 받음.
  const location = useLocation();
  const data = location.state;
  console.log(data);
  
  // display div of availables times
  const [calendarTouched, setCalendarTouched] = useState<Boolean>(false)

  // 날짜
  let today = startOfToday()
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
  let [selectedDay, setSelectedDay] = useState(today)
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())
  let days = useMemo(() => eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  }), [firstDayCurrentMonth])


  // 예약가능한 시간 
  const [availableTimesInThisMonth, setAvailableTimesInThisMonth] = useState<
    number[]
    >([])
  const [availableTimesInThisMonthForEachDay, setAvailableTimesInThisMonthForEachDay] = useState<Date[][]>([])

  // 이전달 다음달
  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy", {locale:ko}))
  }
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy", {locale:ko}))
  }

  // 선택한 날짜에 가능한 시간 가져옴
  const freeTimes = useMemo(() => {
    const StartOfToday = startOfDay(selectedDay)
    const endOfToday = endOfDay(selectedDay)
    // 예약가능한 시간 설정해주기
    const startHour = data.actBeginTm 
    const endHour = data.actEndTm 
    let hoursInDay = 
      {
        start: startHour,
        end: endHour,
      };
   

    // 가능한 시간 필터링
    let freeTimes = hoursInDay

    return (freeTimes)
    
  }, [selectedDay])

  // 이달에 예약가능한 시간 계산
  useMemo(() => {
    let thisMonthTimesLength: number[] = []
    let thisMonthTimesEachDay: Date[][] = []
    days.map((day, dayIdx) => {
      // get times

      const StartOfToday = startOfDay(day)
      const endOfToday = endOfDay(day)
      // change your working hours here
      const startHour = set(StartOfToday, { hours: data.actBeginTm })
      const endHour = set(endOfToday, { hours: data.actEndTm })
      let hoursInDay = 
        {
          start: startHour,
          end: endHour,
        }

      // filter the available hours
    //   let freeTimes = hoursInDay.filter(
    //     (hour) =>
    //       !reservations.includes(parseISO(hour.toISOString()).toString())
    //   )
    //   thisMonthTimesLength.push(freeTimes.length)
    //   thisMonthTimesEachDay.push(freeTimes)
    })

    setAvailableTimesInThisMonth(thisMonthTimesLength)
    setAvailableTimesInThisMonthForEachDay(thisMonthTimesEachDay)

  }, [currentMonth])

  return (
    <div className="calendarReserve">
      <div>
        <span>
          원하는 날짜와 시간을 선택해주세요
        </span>
      </div>

      {/* calendar implementation */}
      <div className="calendarImplementation">
        {/* calendar header */}
        <div className="calendarHeader">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isThisMonth(new Date(currentMonth))}
          >
            <ChevronLeft
              size={20}
              aria-hidden="true"
              className={cn(
                isThisMonth(new Date(currentMonth)) && "text-gray-300"
              )}
            />
          </button>
          <h2 className="font-semibold text-orange-950 justify-center flex">
            {format(firstDayCurrentMonth, " MMMM yyyy", {locale:ko})}
          </h2>
          <button
            type="button"
            className="flex justify-end"
            onClick={nextMonth}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {/* calendar body */}
        <div className="calendarBody">
          <div className="calendarDay">
            {/* 요일 */}
            {dayNames.map((day, i) =>
            {
              return(
              <div
                key={i}
                className={cn(
                  "day",
                  {
                    "holiday":
                      day === "일" || day === "토",
                  }
                )}
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
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day) - 1],
                    "getDay",
                    (getDay(day) === 0 || getDay(day) === 6) &&
                      "holiday"
                  )}
                >
                  
                  <label id="dateLabel">
                  <button
                    onClick={() => {
                      setCalendarTouched(true)
                      setSelectedDay(day)
                    }}
                    className={cn(
                      "w-12 h-12 flex flex-col p-2 justify-center items-center rounded-xl gap-0 group bg-gray-50 relative group",
                      isEqual(day, selectedDay) &&
                        "bg-orange-100 text-slate-900 text-lg",
                      isEqual(today, day) && "text-blue-900 bg-blue-50",
                      isBefore(day, today) &&
                        "text-red-800 bg-red-50 cursor-not-allowed",
                      isEqual(today, day) && "text-blue-900 bg-blue-50",
                      isBefore(day, today) && "cursor-not-allowed",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-blue-200",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900"
                    )}
                    disabled={isBefore(day, today)}
                    id="dateLabel"
                  >

                    
                  </button>
                      <time
                        dateTime={format(day, "yyyy-MM-dd")}
                        className={cn(
                          "getDay",
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            "getDay selected"
                        )}
                      >
                        {format(day, "d")}
                      </time>
{/* 
                      {isAfter(day, startOfYesterday()) && (
                      // <TimesBar
                      //   times={availableTimesInThisMonthForEachDay[dayIdx]}
                      // />
                    )} */}
                    </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={cn(`hidden`, calendarTouched && "block")}>
        <span className="flex items-center w-full justify-center gap-1">
          <span>
            Select your reservation time for
            <span className="text-orange-950 font-semibold pl-1">
              {format(selectedDay, "dd MMMM yyyy", {locale:ko}).toString()}
            </span>
          </span>
        </span>
        
        <AvailableHours freeTimes={freeTimes} />
      </div>
    </div>
  )
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]