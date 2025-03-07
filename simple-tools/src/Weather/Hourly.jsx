import React from 'react';

const Hourly = ({ time, temperature, apparent, probability }) => {
    return (
        <div className='bg-gray-50 p-2 text-center rounded-lg shadow-sm'>
            <div className='text-gray-500'>{time}</div>
            <div className='font-bold'>
                <span className='text-lg text-blue-800'>{Math.round(temperature)}°</span>
                <span className='text-sm text-blue-700'> {Math.round(apparent)}°</span>
            </div>
            <div className='text-gray-500 text-sm'>
            {probability > 0 ? `${probability}% chance of rain` : 'No rain expected'}            </div>
        </div>
    );
};

export default Hourly;