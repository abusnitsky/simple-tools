import React from 'react';

const Hourly = ({ time, temperature, apparent, probability }) => {
    return (
        <div className='bg-blue-100 p-2 text-center'>
            <div className='text-gray-800'>{time}</div>
            <div>
                <span className='text-lg'>{Math.round(temperature)}°</span>
                <span className='text-sm text-gray-700'> {Math.round(apparent)}°</span>
            </div>
            <div>
                {probability > 0 ? probability + '%' : '\u00A0'}
            </div>
        </div>
    );
};

export default Hourly;