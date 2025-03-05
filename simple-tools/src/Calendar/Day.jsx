import React from 'react';

const Day = ({ day, month, holiday, important, event, off, changeView }) => {

    const today = new Date();
    const compareDate = new Date(today.getFullYear(), month - 1, day);
    const isToday = today.getDate() === compareDate.getDate() && today.getMonth() === compareDate.getMonth();

    return (
        <div className={`bg-gray-50 justify-center items-center ${off ? 'text-gray-500' : ''} ${isToday && !off ? 'ring-1' : ''} cursor-pointer`}
            onClick={changeView}>
            <div className={`${holiday ? 'bg-red-400' : ' bg-inherit text-inherit'}  text-center`}>
                <span >{day}</span>
            </div>
            <div className='flex justify-center items-center'>
                <div className={`${important ? 'bg-red-500' : 'bg-inherit'} w-full text-center`}>
                    {important ? '!' : '_'}</div>
                <div className={`${event ? 'bg-green-500' : 'bg-inherit'} w-full text-center`}>
                    {event ? 'E' : '_'}
                </div>
            </div>

        </div>
    );
};

export default Day;