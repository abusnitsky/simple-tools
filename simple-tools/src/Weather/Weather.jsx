import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import config from '../config';
import weatherJSONT from './weather.json';
import Hourly from './Hourly';
import Daily from './Daily';
import sunnyIcon from '../assets/sunny_32dp.svg';
import cloudyIcon from '../assets/cloud_32dp.svg';
import rainyIcon from '../assets/rainy_32dp.svg';
import partlyCloudyIcon from '../assets/partly_cloudy_day_32dp.svg';

const Weather = () => {

    const [weatherJSON, setWeatherJSON] = useState(weatherJSONT);
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDay = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString([], { weekday: 'short', day: 'numeric' });
    }

    const getIcon = (precipitation, cloudCover) => {
        if (precipitation > 0) {
            return rainyIcon;
        } else if (cloudCover > 50) {
            return cloudyIcon;
        } else if (cloudCover > 0) {
            return partlyCloudyIcon;
        } else {
            return sunnyIcon;
        }
    };

    useEffect(() => {
        axios.get(config.WEATHER_API_URL)
            .then((response) => {
                setWeatherJSON(response.data);
            });
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg m-3 p-6 max-w-full min-w-md h-full space-y-4">
                <div className='flex justify-between items-center bg-gray-50 px-2 py-1 rounded-t-lg shadow-sm'>
                    <div className='text-center'>
                        <div className='text-gray-500'>Today, {formatTime(weatherJSON.current.time)}</div>
                        <div className='font-bold'>
                            <span className='text-4xl text-blue-800'>{Math.round(weatherJSON.current.temperature_2m)}°</span>
                            <span className='text-2xl text-blue-700'> {Math.round(weatherJSON.current.apparent_temperature)}°</span>
                        </div>
                        <div className='text-gray-700'>{weatherJSON.current.precipitation > 0 ? weatherJSON.current.precipitation + 'mm' : ''}</div>
                    </div>
                    <div>
                        <img src={getIcon(weatherJSON.current.precipitation, weatherJSON.current.cloud_cover)} alt="Weather Icon" />
                    </div>
                    <div className='text-gray-600'>
                        <div>Clouds: {weatherJSON.current.cloud_cover}%</div>
                        <div>Wind: {weatherJSON.current.wind_speed_10m} km/h</div>
                        <div>Humidity: {weatherJSON.current.relative_humidity_2m}%</div>
                        <div>Pressure: {weatherJSON.current.surface_pressure} hPa</div>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-4'>
                    {[10, 14, 18, 22].map((hour) => (
                        <Hourly
                            key={hour}
                            time={formatTime(weatherJSON.hourly.time[hour])}
                            temperature={weatherJSON.hourly.temperature_2m[hour]}
                            apparent={weatherJSON.hourly.apparent_temperature[hour]}
                            probability={weatherJSON.hourly.precipitation_probability[hour]}
                        />
                    ))}
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {[1, 2, 3, 4, 5, 6].map((date) => (
                        <Daily
                            key={date}
                            date={formatDay(weatherJSON.daily.time[date])}
                            minTemp={weatherJSON.daily.temperature_2m_min[date]}
                            maxTemp={weatherJSON.daily.temperature_2m_max[date]}
                            probability={weatherJSON.daily.precipitation_probability_max[date]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Weather;