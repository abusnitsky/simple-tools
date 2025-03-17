import React from 'react';

const Day = ({ day, month, holiday, important, event, off, changeView }) => {

    const today = new Date();
    const compareDate = new Date(today.getFullYear(), month - 1, day);
    const isToday = today.getDate() === compareDate.getDate() && today.getMonth() === compareDate.getMonth();

    return (
        <div className={`bg-gray-50 justify-center items-center ${off ? 'text-gray-400' : 'hover:scale-105 cursor-pointer text-gray-600'} ${isToday && !off ? 'ring-1 ring-gray-600 ring-offset-1' : 'ring-gray-400'} shadow-sm `}
            onClick={changeView}>
            <div className={`${holiday ? 'bg-red-400 text-gray-100 rounded-sm' : ' bg-gray-100 text-inherit rounded-sm'}  text-center shadow-sm pb-1`}>
                <span className=''>{day}</span>
            </div>
            <div className='flex justify-center items-center'>
                <div className={`${important ? 'bg-red-400 shadow-sm' : 'bg-inherit'} w-full text-center rounded-full scale-75 pb-0.5`}>
                    {important ? '!' : '\u00A0'}
                </div>
                <div className={`${event ? 'bg-amber-300 shadow-sm' : 'bg-inherit'} w-full text-center rounded-full scale-75 pb-0.5`}>
                    {event ? 'E' : '\u00A0'}
                </div>
            </div>
        </div>
    );
};

export default Day;