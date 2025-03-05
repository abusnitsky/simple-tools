import React, { useState, useEffect } from 'react';
import DayPage from '../Calendar/DayPage';
import Day from '../Calendar/Day';

const Settings = () => {

    const [dayView, setDayView] = useState(false);

    const handleDayView = () => {
        setDayView(!dayView);
    }

    return (
        <div className='flex justify-center bg-gray-200'>
            <div className='bg-amber-100 mt-2 flex flex-col gap-2' id='settings'>
                {dayView ?
                    <DayPage /> :
                    <div>
                        <Day day={1} month={1} holiday={true} important={true} event={true} off={false} changeView={handleDayView}/>
                    </div>
                }

            </div>
        </div>
    );
};

export default Settings;