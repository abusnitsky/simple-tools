import React from 'react';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';
import HeaderNavButton from './HeaderNavButton';
import timerIcon from '../assets/timer_32dp.svg';
import stopwatchIcon from '../assets/stopwatch_32dp.svg';
import todoIcon from '../assets/to_do_32dp.svg';
import calendarIcon from '../assets/calendar_32dp.svg';
import weatherIcon from '../assets/weather_32dp.svg';
import translitIcon from '../assets/translit_32dp.svg';

const Header = () => {

    return (
        <header className='header'>
            <HeaderTop />
            <nav className='header-nav'>
                <HeaderNavButton id='timer' icon={timerIcon}/>
                <HeaderNavButton id='stopwatch' icon={stopwatchIcon}/>
                <HeaderNavButton id='todo' icon={todoIcon}/>
                <HeaderNavButton id='calendar' icon={calendarIcon}/>
                <HeaderNavButton id='weather' icon={weatherIcon}/>
                <HeaderNavButton id='translit' icon={translitIcon}/>   
            </nav>
            <HeaderBottom />
        </header>
    );
};

export default Header;