import React from 'react';
import HeaderClock from './HeaderClock';
import HeaderDate from './HeaderDate';
import HeaderWeather from './HeaderWeather';
import HeaderCalendarEvent from './HeaderCalendarEvent';
import HeaderHoliday from './HeaderHoliday';
import HeaderNavButton from './HeaderNavButton';
import timerIcon from '../assets/timer_32dp.svg';
import stopwatchIcon from '../assets/stopwatch_32dp.svg';
import todoIcon from '../assets/to_do_32dp.svg';
import calendarIcon from '../assets/calendar_32dp.svg';
import weatherIcon from '../assets/weather_32dp.svg';
import translitIcon from '../assets/translit_32dp.svg';
import settingsIcon from '../assets/settings_32dp.svg';

const Header = () => {

    return (
        <header className='text-center space-y-1'>
            <div className='flex justify-center space-x-3'>
                <HeaderClock /><span>&#8226;</span>
                <HeaderDate /><span>&#8226;</span>
                <HeaderWeather />
            </div>
            <nav className='flex justify-center space-x-3'>
                <HeaderNavButton id='timer' icon={timerIcon} />
                <HeaderNavButton id='stopwatch' icon={stopwatchIcon} />
                <HeaderNavButton id='todo' icon={todoIcon} />
                <HeaderNavButton id='calendar' icon={calendarIcon} />
                <HeaderNavButton id='weather' icon={weatherIcon} />
                <HeaderNavButton id='translit' icon={translitIcon} />
                <HeaderNavButton id='settings' icon={settingsIcon} />
            </nav>
            <div className='flex justify-center space-x-3'>
                <HeaderCalendarEvent /><span>&#8226;</span>
                <HeaderHoliday />
            </div>
        </header>
    );
};

export default Header;