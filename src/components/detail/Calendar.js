import React from 'react';
import { useState, useEffect, useRef } from "react";
import UseOutsideClick from "../UseOutsideClick";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth2, setCurrentMonth2] = useState((currentMonth + 1) % 12);
  const [currentYear2, setCurrentYear2] = useState((currentMonth === 11) ? currentYear + 1 : currentYear);
  const [count, setCount] = useState(0);
  const [clickDate, setClickDate] = useState({ date: 0, month: 0, year: 0 });
  const [clickDate2, setClickDate2] = useState({ date: 0, month: 0, year: 0 });
  const [isChooseDate, setIsChooseDate] = useState(false);
  const [resultCalendar1, setResultCalendar1] = useState();
  const [showWrapper, setShowWrapper] = useState(false);
  const [isPrevious, setIsPrevious] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [countNextPrevious, setCountNextPrevious] = useState(0);
  const [dayEnd, setDayEnd] = useState({ date: 0, month: 0, year: 0 });

  const refMonthAndYear1 = useRef(null);
  const refMonthAndYear2 = useRef(null);
  const refPickedCalendar = useRef(null);
  const refWrapper = useRef();

  const calendar = [];
  const calendar2 = [];
  const firstDay = (new Date(currentYear, currentMonth)).getDay();
  const firstDay2 = (new Date(currentYear2, currentMonth2)).getDay();
  const daysCalendar = document.getElementsByClassName('date-picker');

  UseOutsideClick(refWrapper, () => {
    setShowWrapper(false);
  })

  useEffect(() => {
    for (let item of daysCalendar) {
      item.classList.remove('selected');
      item.classList.remove('selected-two');
    }
    for (let item of daysCalendar) {
      if (item.getAttribute("data-date") === clickDate.date && item.getAttribute('data-month') === clickDate.month + 1
        && item.getAttribute('data-year') === clickDate.year) {
        item.classList.add('selected');
      }
    }
  }, [currentMonth])

  useEffect(() => {
    for (let item of daysCalendar) {
      item.classList.remove('selected');
      item.classList.remove('selected-two');
      item.classList.remove('active');
    }
    for (let item of daysCalendar) {
      const isLoading = new Date(`${item.getAttribute("data-year")}-${item.getAttribute("data-month")}-${item.getAttribute("data-date")}`);
      const isClick = new Date(`${clickDate.year}-${parseInt(clickDate.month) + 1}-${clickDate.date}`);
      const isClick2 = new Date(`${clickDate2.year}-${parseInt(clickDate2.month) + 1}-${clickDate2.date}`);
      if (isLoading.getTime() > isClick.getTime() && isLoading.getTime() < isClick2.getTime()) {
        item.classList.add('active');
      }
      if (isLoading.getTime() === isClick.getTime()) {
        item.classList.add('selected');
      }
      if (isLoading.getTime() === isClick2.getTime()) {
        item.classList.add('selected-two');
      }
    }
  }, [isPrevious, isNext])

  useEffect(() => {
    if (showWrapper === false) {
      setCountNextPrevious(0);
    }
  }, [showWrapper])

  const previous = () => {
    let temp = countNextPrevious;
    setCountNextPrevious(++temp);
    setIsPrevious(!isPrevious);
    setCurrentYear((currentMonth === 0) ? currentYear - 1 : currentYear);
    setCurrentMonth((currentMonth === 0) ? 11 : currentMonth - 1);
    setCurrentYear2((currentMonth2 === 0) ? currentYear2 - 1 : currentYear2);
    setCurrentMonth2((currentMonth2 === 0) ? 11 : currentMonth2 - 1);
  }

  const next = () => {
    let temp = countNextPrevious;
    setCountNextPrevious(++temp);
    setIsNext(!isNext);
    setCurrentYear((currentMonth === 11) ? currentYear + 1 : currentYear);
    setCurrentMonth((currentMonth + 1) % 12);
    setCurrentYear2((currentMonth2 === 11) ? currentYear2 + 1 : currentYear2);
    setCurrentMonth2((currentMonth2 + 1) % 12);
  }

  const findDay = (e) => {
    const findDay = new Date();
    findDay.setDate(e.currentTarget.getAttribute('data-date'));
    findDay.setMonth(e.currentTarget.getAttribute('data-month') - 1);
    findDay.setFullYear(e.currentTarget.getAttribute('data-year'));
    return findDay;
  }

  useEffect(() => {
    if (count === 1) {
      for (let item of daysCalendar) {
        item.classList.remove('choosen-two');
      }
      for (let i = 0; i < daysCalendar.length; i++) {
        const isLoading = new Date(`${daysCalendar[i].getAttribute("data-year")}-${daysCalendar[i].getAttribute("data-month")}-${daysCalendar[i].getAttribute("data-date")}`);
        const beginTimestamp = new Date(`${clickDate.year}-${clickDate.month + 1}-${clickDate.date}`);
        const endTimestamp = new Date(`${dayEnd.year}-${dayEnd.month}-${dayEnd.day}`);
        if (isLoading.getTime() < beginTimestamp.getTime() || isLoading.getTime() > endTimestamp.getTime()) {
          daysCalendar[i].classList.add('choosen-two');
        }
      }
    }

  }, [isPrevious, isNext]);

  useEffect(() => {
    for (let item of daysCalendar) {
      item.classList.remove('choosen-two');
    }
  }, [showWrapper])

  const chooseDate = (e) => {
    let temp = count;
    setCount(++temp);
    setIsChooseDate(true);
    const day = e.currentTarget.getAttribute('data-date');
    const month = e.currentTarget.getAttribute('data-month_name');
    const year = e.currentTarget.getAttribute('data-year');
    if (count === 0) {

      for (let item of daysCalendar) {
        item.classList.remove('selected');
        item.classList.remove('selected-two');
        item.classList.remove('active');
      }

      e.currentTarget.classList.add('selected');
      setClickDate({ date: day, month: MONTHS.indexOf(month), year: year });
      const result = `${DAYS[findDay(e).getDay()]}, ${day} ${month} ${year}`;
      setResultCalendar1(result);
      setClickDate2({ date: 0, month: 0, year: 0 });

      const timestampClick = new Date(`${year}-${MONTHS.indexOf(month) + 1}-${day}`);
      let indexClick;
      for (let i = 0; i < daysCalendar.length; i++) {
        const isLoading = new Date(`${daysCalendar[i].getAttribute("data-year")}-${daysCalendar[i].getAttribute("data-month")}-${daysCalendar[i].getAttribute("data-date")}`);
        if (timestampClick.getTime() === isLoading.getTime()) {
          indexClick = i;
          break;
        }
      }

      let dayEndInit = { day: 0, month: 0, year: 0 };
      for (let i = indexClick + 1; i < daysCalendar.length; i++) {
        if (daysCalendar[i].classList.contains('choosen') === true) {
          dayEndInit = { day: daysCalendar[i].getAttribute('data-date'), month: daysCalendar[i].getAttribute('data-month'), year: daysCalendar[i].getAttribute('data-year') };
          break;
        }
      }
      setDayEnd(dayEndInit);
      for (let i = 0; i < daysCalendar.length; i++) {
        const isLoading = new Date(`${daysCalendar[i].getAttribute("data-year")}-${daysCalendar[i].getAttribute("data-month")}-${daysCalendar[i].getAttribute("data-date")}`);
        const endTimestamp = new Date(`${dayEndInit.year}-${dayEndInit.month}-${dayEndInit.day}`);
        if (isLoading.getTime() < timestampClick.getTime() || isLoading.getTime() > endTimestamp.getTime()) {
          daysCalendar[i].classList.add('choosen-two');
        }
      }
    }


    if (count === 1) {
      const clickOne = new Date(clickDate.year, clickDate.month, clickDate.date);
      const clickTwo = new Date(year, parseInt(MONTHS.indexOf(month)), day);
      if (clickTwo.getTime() <= clickOne.getTime()) {
        setClickDate2({ date: 0, month: 0, year: 0 });
        const daysCalendar = document.getElementsByClassName("date-picker");
        for (let item of daysCalendar) {
          item.classList.remove('selected');
        }
        e.currentTarget.classList.add('selected');
        setCount(1);
        setClickDate({ date: day, month: MONTHS.indexOf(month), year: year });
        setClickDate2({ date: 0, month: 0, year: 0 });
        const result = `${DAYS[findDay(e).getDay()]}, ${day} ${month} ${year}`;
        setResultCalendar1(result);
      }
      else {
        setClickDate2({ date: day, month: MONTHS.indexOf(month), year: year });
        e.currentTarget.classList.add('selected-two');
        setIsChooseDate(false);
        setCount(0);
        setShowWrapper(false);
        const result = `${DAYS[findDay(e).getDay()]}, ${day} ${month} ${year}`;
        refPickedCalendar.current.value = `${resultCalendar1} - ${result}`;
      }
    }
  }

  const mouseDate = (e) => {
    const daysCalendar = document.getElementsByClassName("date-picker");
    if (count === 1) {
      for (let item of daysCalendar) {
        item.classList.remove('active');
      }
    }

    if (isChooseDate) {
      for (let item of daysCalendar) {
        const isLoading = new Date(`${item.getAttribute("data-year")}-${item.getAttribute("data-month")}-${item.getAttribute("data-date")}`);
        const isClick = new Date(`${clickDate.year}-${parseInt(clickDate.month) + 1}-${clickDate.date}`);
        const isMouseOver = new Date(`${e.currentTarget.getAttribute("data-year")}-${e.currentTarget.getAttribute("data-month")}-${e.currentTarget.getAttribute("data-date")}`);
        if (isLoading.getTime() > isClick.getTime() && isLoading.getTime() <= isMouseOver.getTime()) {
          item.classList.add('active');
        }
      }
    }
  }


  function isBlockTime(day) {
    return (((day.date >= 10 && day.date < 18) || (day.date >= 26 && day.date <= 29))
      && day.year === 2019 && day.month > 8);
  }


  useEffect(() => {
    if (showWrapper === true) {
      if (countNextPrevious !== 0) {
        for (let item of daysCalendar) {
          item.classList.remove('choosen');
        }
      }

      const daysCalendarArray = Array.from(daysCalendar);
      const bgFlags = daysCalendarArray.map(element =>
        ({
          date: parseInt(element.getAttribute("data-date")),
          month: parseInt(element.getAttribute("data-month")),
          year: parseInt(element.getAttribute("data-year"))
        })
      );

      bgFlags.map((item, index) => {
        if (isBlockTime(item) === true) {
          daysCalendar[index].classList.add('choosen');
        }
      });
    }

  }, [currentMonth, showWrapper])


  const showCalendar = () => {
    if (count === 1) {
      for (let i of daysCalendar) {
        i.classList.remove('active');
      }
    }
    setCount(0);
    setIsChooseDate(false);
    setIsPrevious(false);
    setIsNext(false);
    setShowWrapper(true);
  }

  useEffect(() => {
    refMonthAndYear1.current.innerHTML = MONTHS[currentMonth] + " " + currentYear;
    refMonthAndYear2.current.innerHTML = MONTHS[currentMonth2] + " " + currentYear2;
  })

  let date = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        calendar.push(null);
      } else if (date > 32 - new Date(currentYear, currentMonth, 32).getDate()) {
        break;
      } else {
        calendar.push(date);
        date++;
      }
    }
  }

  let date2 = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay2) {
        calendar2.push(null);
      } else if (date2 > 32 - new Date(currentYear2, currentMonth2, 32).getDate()) {
        break;
      } else {
        calendar2.push(date2);
        date2++;
      }
    }
  }

  return (
    <div className="container" ref={refWrapper}>
      <input ref={refPickedCalendar} className="showing-calendar" type="button" onClick={showCalendar} />
      <div className="wrap-table">
        <div ref={refWrapper} className="wrapper table-one" style={{ display: showWrapper ? 'block' : 'none' }}>
          <div className="button-container-calendar" >
            <h3 ref={refMonthAndYear1} id="month-and-year" />
            <button id="previous" onClick={previous}>‹</button>
            <button id="next-one" onClick={next}>›</button>
          </div>
          <div className="table-calendar" id="calendar" data-lang="en" >
            <div className="weekdays" id="thead-month">
              {DAYS.map((item, index) => (
                <div className="day" key={index} data-days={item}>{item}</div>
              ))}
            </div>
            <div className="days" id="calendar-body">
              {calendar.map((item, index) => (
                <div onClick={chooseDate} onMouseOver={mouseDate} data-date={item} data-month={currentMonth + 1} data-year={currentYear}
                  data-month_name={MONTHS[currentMonth]} className={`day date-picker ${item === null && 'disabled'}`} key={index}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div >
        <div ref={refWrapper} className="wrapper table-two" style={{ display: showWrapper ? 'block' : 'none' }}>
          <div className="button-container-calendar" >
            <h3 ref={refMonthAndYear2} id="month-and-year" />
            <button id="next" onClick={next}>›</button>
          </div>
          <div className="table-calendar" id="calendar" data-lang="en" >
            <div className="weekdays" id="thead-month">
              {DAYS.map((item, index) => (
                <div className="day" key={index} data-days={item}>{item}</div>
              ))}
            </div>
            <div className="days" id="calendar-body">
              {calendar2.map((item, index) => (
                <div onClick={chooseDate} onMouseOver={mouseDate} data-date={item} data-month={currentMonth2 + 1} data-year={currentYear2}
                  data-month_name={MONTHS[currentMonth2]} className={`day date-picker ${item === null && 'disabled'}`} key={index}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div >
      </div>
    </div>
  )
}

export default Calendar
