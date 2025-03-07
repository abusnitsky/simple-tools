import React from 'react';

const Daily = ({date, minTemp, maxTemp, probability}) => {
    return (
        <div className='bg-gray-200 text-center p-2 rounded-b-lg text-gray-800'>
            <div className=''>{date}</div>
            <div className='text-black'>{`${minTemp}° .. ${maxTemp}°`}</div>
            <div>
            {probability > 0 ? probability + '%' : '\u00A0'}
            </div>
        </div>
    );
};

export default Daily;