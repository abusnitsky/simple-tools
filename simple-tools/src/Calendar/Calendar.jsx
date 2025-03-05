import React, { useState, useEffect, useMemo } from 'react';
import Day from './Day';
import DayPage from './DayPage';
import feiertage from './hol.json';
import nextIcon from '../assets/arrow_forward_ios_24dp.svg';
import prevIcon from '../assets/arrow_back_ios_24dp.svg';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(''); // 'YYYY-MM'
    const [currentDay, setCurrentDay] = useState(''); // 'DD'


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

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md h-full">

                {dayView ?
                    <DayPage changeView={handleDayView} year={year} month={month} day={currentDay} /> :
                    <div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => changeMonth(-1)}
                        className='bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-l-lg'>
                        <img src={prevIcon} alt='Previous' />
                    </button>
                    <input className='flex-grow p-2 border border-gray-300 focus:outline-none' type='month' value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)} />
                    <button onClick={() => changeMonth(1)}
                        className='bg-green-800 hover:bg-green-700 text-white p-2 rounded-r-lg'>
                        <img src={nextIcon} alt='Next' />
                    </button>
                </div>
                <div>
                    <div className='grid grid-cols-7 gap-1 mt-2'>
                        {dayNames.map(day => (
                            <div key={day} className='bg-gray-200 flex justify-center items-center'>
                                <span>{day}</span>
                            </div>
                        ))}
                    </div>
                    <div className='grid grid-cols-7 gap-1 mt-1'>
                        {previousMonthDays.map((day, i) => (
                            <Day key={`prev-${i}`} day={day} holiday={isHoliday(year, month - 1, day)} off={true} />
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => (
                            <Day key={i + 1} 
                            day={i + 1} 
                            month={month} 
                            holiday={isHoliday(year, month, i + 1) || isSunday(year, month, i + 1)}
                            changeView={()=>handleDayView(i+1)} />
                        ))}
                        {nextMonthDays.map((day, i) => (
                            <Day key={`next-${i}`} day={day} holiday={isHoliday(year, month + 1, day)} off={true} />
                        ))}
                    </div>
                </div>                        
                    </div>
                }

            </div>
        </div>
    );
};

export default Calendar;
