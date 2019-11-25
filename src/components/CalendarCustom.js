import React from 'react';
import { useState, useEffect, useRef } from "react";
import UseOutsideClick from "./UseOutsideClick";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarCustom = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [showWrapper, setShowWrapper] = useState(false);
  const [flagCalendar, setFlagCalendar] = useState(false);
  const [hiddenCalendar, setHiddenCalendar] = useState(false);
  const [flagMonthYear, setFlagMonthYear] = useState(null);
  const [showMonth, setShowMonth] = useState(false);
  const [hiddenMonth, setHiddenMonth] = useState(false);
  const [hiddenYear, setHiddenYear] = useState(false);

  const refCalendarBody = useRef(null);
  const refMonthAndYear = useRef(null);
  const refPickedCalendar = useRef(null);
  const refWrapper = useRef();

  const calendar = [];
  const firstDay = (new Date(currentYear, currentMonth)).getDay();

  UseOutsideClick(refWrapper, () => {
    if (flagCalendar === true) {
      setShowWrapper(false);
      setFlagCalendar(false);
    }
  })

  const previous = () => {
    setCurrentYear((currentMonth === 0) ? currentYear - 1 : currentYear);
    setCurrentMonth((currentMonth === 0) ? 11 : currentMonth - 1);
    if(hiddenMonth === true){
      setCurrentYear((currentYear !== 0) ? currentYear - 1 : 0);     
    }
    if(hiddenYear === true){
      setCurrentYear((currentYear !== 0) ? currentYear - 10 : 0);   
    }
  }

  const next = () => {
    setCurrentYear((currentMonth === 11) ? parseInt(currentYear) + 1 : currentYear);
    setCurrentMonth((parseInt(currentMonth) + 1) % 12);
    if(hiddenMonth === true){
      setCurrentYear(parseInt(currentYear) + 1);     
    }
    if(hiddenYear === true){
      setCurrentYear(parseInt(currentYear) + 10);   
    }
  }

  const findDay = (e) => {
    const findDay = new Date();
    findDay.setDate(e.currentTarget.getAttribute('data-date'));
    findDay.setMonth(e.currentTarget.getAttribute('data-month') - 1);
    findDay.setFullYear(e.currentTarget.getAttribute('data-year'));
    return findDay;
  }

  const chooseDate = (e) => {
    const day = e.currentTarget.getAttribute('data-date');
    const month = e.currentTarget.getAttribute('data-month_name');
    const year = e.currentTarget.getAttribute('data-year');
    refPickedCalendar.current.value = `${DAYS[findDay(e).getDay()]}, ${day} ${month} ${year}`;
    setShowWrapper(false);
    setFlagCalendar(false);
  }

  const showCalendar = () => {
    setShowWrapper(true);
    setFlagCalendar(true);
  }

  const showMonthYear = () => {
    setHiddenCalendar(true);
    setFlagMonthYear(true);
    setShowMonth(true);
    setHiddenMonth(true);
    if (showMonth === true && hiddenCalendar === true) {
      setHiddenMonth(false);
      setHiddenYear(true);
    }
  }

  const chooseMonth = (e) => {
    const findMonth = MONTHS.indexOf(e.currentTarget.textContent);
    setCurrentMonth(findMonth);
    setHiddenMonth(false);
    setHiddenCalendar(false);
  }

  const chooseYear = (e) => {
    setCurrentYear(e.currentTarget.textContent);
    setHiddenYear(false);
    setHiddenMonth(true);
  }

  useEffect(() => {
    refMonthAndYear.current.innerHTML = MONTHS[currentMonth] + " " + currentYear;
    if (showMonth === true) {
      refMonthAndYear.current.innerHTML = MONTHS[currentMonth] + " " + currentYear;
    }

    if (flagMonthYear === true && hiddenMonth === true) {
      refMonthAndYear.current.innerHTML = currentYear;
    }

    if(hiddenCalendar === true && hiddenMonth === false && hiddenYear === true ){
      refMonthAndYear.current.innerHTML = `${currentYear - 5} - ${parseInt(currentYear) + 6}`;
    }   
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

  let month = MONTHS.map((item, index) => (
    <div className="month" key={index} style={{ display: showMonth ? 'flex' : 'none' }} onClick={chooseMonth}>{item}</div>
  ))

  let year = MONTHS.map((item, index) => (
    <div className="year" key={index} onClick={chooseYear}>{currentYear - 5 + index}</div>
  ))

  return (
    <div className="container"> 
      <input ref={refPickedCalendar} id="picked-calendar" type="button" onClick={showCalendar} />
      <div ref={refWrapper} className="wrapper wrapper-not-range" style={{ display: showWrapper ? 'block' : 'none' }}>
        <div className="button-container-calendar" >
          <h3 ref={refMonthAndYear} id="month-and-year" onClick={showMonthYear} />
          <button id="previous" onClick={previous}>‹</button>
          <button id="next" onClick={next}>›</button>
        </div>
        <div className="table-calendar" id="calendar" data-lang="en"
          style={{ display: hiddenCalendar ? 'none' : 'block' }}>
          <div className="weekdays" id="thead-month">
            {DAYS.map((item, index) => (
              <div className="day" key={index} data-days={item}>{item}</div>
            ))}
          </div>
          <div className="days" id="calendar-body" ref={refCalendarBody}>
            {calendar.map((item, index) => (
              <div className={`day date-picker ${item === null && 'disabled'}`} onClick={chooseDate} data-date={item} data-month={currentMonth + 1} data-year={currentYear}
                data-month_name={MONTHS[currentMonth]} key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="table-month" style={{ display: hiddenMonth ? 'flex' : 'none' }}>
          {month}
        </div>

        <div className="table-year" style={{ display: hiddenYear ? 'flex' : 'none' }}>
          {year}
        </div>
      </div >
    </div>
  )
}

export default CalendarCustom
