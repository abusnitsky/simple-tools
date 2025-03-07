import React from 'react';

const Daily = ({date, minTemp, maxTemp, probability}) => {
    return (
        <div className='bg-gray-50 shadow-md rounded-lg p-4 text-gray-900'>
            <div className='text-lg font-semibold text-gray-500 text-center'>{date}</div>
            <div className='text-xl font-bold text-blue-800'>{`${minTemp}°.. ${maxTemp}°`}</div>
            <div className='text-sm text-gray-500'>
                {probability > 0 ? `${probability}% chance of rain` : 'No rain expected'}
            </div>
        </div>
    );
};

export default Daily;