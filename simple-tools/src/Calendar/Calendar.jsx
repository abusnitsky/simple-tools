import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import config from '../config.js'
import API from '../utils/api.js'
import Day from './Day';
import DayPage from './DayPage';
import feiertage from './hol.json';
import nextIcon from '../assets/arrow_forward_ios_24dp.svg';
import prevIcon from '../assets/arrow_back_ios_24dp.svg';
import PageBody from '../Components/Containers/PageBody.jsx';
import MainContainer from '../Components/Containers/MainContainer.jsx';
const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(''); // 'YYYY-MM'
    const [currentDay, setCurrentDay] = useState(''); // 'DD'
    const [currentEvents, setCurrentEvents] = useState([]);


    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const holidays = feiertage.feiertage;

    useEffect(() => {
        const today = new Date();
        setCurrentMonth(today.toISOString().substring(0, 7));
        setCurrentDay(today.getDate());
    }, []);

    const changeMonth = (offset) => {
        const [year, month] = currentMonth.split('-').map(Number);
        const newDate = new Date(year, month + offset, 1);
        setCurrentMonth(newDate.toISOString().substring(0, 7));
    };

    const isHoliday = (year, month, day) => {
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return holidays.some(holiday => holiday.date === date);
    };

    const isSunday = (year, month, day) => {
        return new Date(year, month - 1, day).getDay() === 0;
    };

    const [year, month] = currentMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const previousMonthDays = Array.from({ length: adjustedFirstDay }, (_, i) => {
        const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
        return prevMonthLastDay - adjustedFirstDay + i + 1;
    });

    const nextMonthDays = Array.from({ length: (7 - ((adjustedFirstDay + daysInMonth) % 7)) % 7 }, (_, i) => i + 1);

    const [dayView, setDayView] = useState(false);

    const handleDayView = (day) => {
        setDayView(!dayView);
        setCurrentDay(day);
    }

    useEffect(() => {
        API.get(`/events?year=${year}&month=${month}`)
            .then(response => setCurrentEvents(response.data))
            .catch(error => console.error('Error:', error));
    }, [currentMonth, currentEvents]);

    const isImportant = (year, month, day) => {
        return currentEvents.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1 && eventDate.getDate() === day && event.important;
        });
    };

    const isEvent = (year, month, day) => {
        return currentEvents.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1 && eventDate.getDate() === day && !event.important;
        });
    };

    return (
        <PageBody>
            <MainContainer>

                {dayView ?
                    <DayPage changeView={handleDayView} year={year} month={month} day={currentDay} /> :
                    <div>
                        <div className='flex justify-center items-center'>
                            <button onClick={() => changeMonth(-1)}
                                className='bg-blue-700 hover:bg-blue-800 pl-4 pr-2 py-2 rounded-l-lg shadow-lg cursor-pointer'>
                                <img src={prevIcon} alt='Previous' />
                            </button>
                            <input className='flex-grow p-2 border border-gray-300 focus:outline-none shadow-sm text-gray-600' type='month' value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)} />
                            <button onClick={() => changeMonth(1)}
                                className='bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-r-lg shadow-lg cursor-pointer'>
                                <img src={nextIcon} alt='Next' />
                            </button>
                        </div>
                        <div className='mt-1.5'>
                            <div className='grid grid-cols-7 gap-1'>
                                {dayNames.map(day => (
                                    <div key={day} className='bg-gray-200 flex justify-center items-center rounded-t-sm shadow-md pb-1 text-gray-700'>
                                        <span>{day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='grid grid-cols-7 gap-1 mt-2'>
                                {previousMonthDays.map((day, i) => (
                                    <Day key={`prev-${i}`} day={day} holiday={isHoliday(year, month - 1, day)} off={true} />
                                ))}
                                {Array.from({ length: daysInMonth }, (_, i) => (
                                    <Day key={i + 1}
                                        day={i + 1}
                                        month={month}
                                        holiday={isHoliday(year, month, i + 1) || isSunday(year, month, i + 1)}
                                        important={isImportant(year, month, i + 1)}
                                        event={isEvent(year, month, i + 1)}
                                        changeView={() => handleDayView(i + 1)} />
                                ))}
                                {nextMonthDays.map((day, i) => (
                                    <Day key={`next-${i}`} day={day} holiday={isHoliday(year, month + 1, day)} off={true} />
                                ))}
                            </div>
                        </div>
                    </div>
                }

            </MainContainer>
        </PageBody>
    );
};

export default Calendar;
