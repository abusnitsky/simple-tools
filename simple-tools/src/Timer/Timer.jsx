import React, { useState, useEffect, useRef } from 'react';
import startTimerIcon from '../assets/start_32dp.svg';
import resetTimerIcon from '../assets/stop_32dp.svg';
import pauseTimerIcon from '../assets/pause_32dp.svg';
import soundOnIcon from '../assets/sound_on_16dp.svg';
import soundOffIcon from '../assets/sound_off_16dp.svg';
import alertSound from '../assets/alert.mp3';
import { secondsToTime } from '../utils/utils.js';

const Timer = () => {
    const [time, setTime] = useState(300);
    const [timerOn, setTimerOn] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const audioRef = useRef(new Audio(alertSound));
    const intervalRef = useRef(null);

    const playAlert = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
    };

    const handleStartButtonClick = () => {
        setTimerOn(prevTimerOn => {
            const newTimerOn = !prevTimerOn;
            return newTimerOn;
        });
    }

    const handleResetButtonClick = () => {
        setTime(300);
        setTimerOn(false);
        clearInterval(intervalRef.current);
    }

    const handleSoundButtonClick = () => {
        setSoundOn(prevSoundOn => {
            const newSoundOn = !prevSoundOn;
            return newSoundOn;
        });
    }

    const handleSetButtonClick = (e) => {
        const value = parseInt(e.target.innerText);
        setTime(prevTime => Math.max(prevTime + (value * 60), 0));
    }

    useEffect(() => {
        if (timerOn) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        playAlert();
                        setTimerOn(false);
                        clearInterval(intervalRef.current);
                        return 0;
                    }
                    return prevTime - 1;
                });

                return () => clearInterval(intervalRef.current);

            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [timerOn]);

    useEffect(() => {
        document.title = timerOn ? secondsToTime(time) : 'Timer - Simple Tools';
    }, [time, timerOn]);

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center'>
            <div className='bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md h-full'>
                <div className='flex justify-between'>
                    <div className='flex flex-col space-y-2'>
                        {[-1, -5, -10].map(value => (
                            <button key={value} className='cursor-pointer px-3 pb-0.5 rounded ring shadow-sm hover:bg-gray-600 hover:text-white' onClick={handleSetButtonClick}>
                                {value}
                            </button>
                        ))}
                    </div>
                    <div id='display' className='flex relative justify-center items-center mx-4 w-6/10'>
                        <span className='text-6xl font-semibold  text-gray-800 font'>{secondsToTime(time)}</span>
                        <button className='absolute -right-1 -top-2 cursor-pointer p-1 bg-gray-700 rounded-full shadow-md transition duration-300 ease-in-out transform hover:bg-gray-600' 
                        onClick={handleSoundButtonClick}>
                            <img src={soundOn ? soundOnIcon : soundOffIcon} alt='Sound Icon' />
                        </button>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        {[1, 5, 10].map(value => (
                            <button key={value} className='cursor-pointer px-3 pb-0.5 rounded ring shadow-sm hover:bg-gray-600 hover:text-white' onClick={handleSetButtonClick}>
                                {'+' + value}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex justify-center space-x-4 mt-3'>
                    <button className='cursor-pointer bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 shadow-md'
                        onClick={handleResetButtonClick}>
                        <img src={resetTimerIcon} alt='Reset Icon' />
                    </button>
                    <button className='cursor-pointer bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 shadow-md'
                        onClick={handleStartButtonClick}>
                        <img src={timerOn ? pauseTimerIcon : startTimerIcon} alt='Start/Pause Icon' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timer;