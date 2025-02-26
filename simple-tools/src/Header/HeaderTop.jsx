import React from 'react';
import Clock from './Clock';
import ShowDate from './ShowDate';

const HeaderTop = () => {
    return (
        <div className='header-top'>
            <Clock />
            <div className='bullet'>&#8226;</div>
            <ShowDate />
{/*             <div className='header-date'>
                {new Date().toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit'
                })}
            </div> */}
            <div className='bullet'>&#8226;</div>
            <div className='header-weather'>25C</div>
        </div>
    );
};

export default HeaderTop;