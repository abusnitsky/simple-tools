import React, { useState, useEffect, useRef, use } from "react";
import startStopwatchIcon from '../assets/start_32dp.svg';
import resetStopwatchIcon from '../assets/stop_32dp.svg';
import pauseStopwatchIcon from '../assets/pause_32dp.svg';
import { secondsToTime } from '../utils/utils.js';

const Stopwatch = () => {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const handleResetButtonClick = () => {
        setElapsedTime(0);
        setIsRunning(false);
    }

    const handleStartButtonClick = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    }

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        document.title = isRunning ? secondsToTime(elapsedTime) : 'Stopwatch - Simple Tools';
    }, [elapsedTime, isRunning]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="bg-white m-3 shadow-md rounded-lg p-6">
                <div className="text-5xl font-mono mb-4">
                    <span>{secondsToTime(elapsedTime)}</span>
                </div>
                <div className="flex space-x-4 justify-center">
                    <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleResetButtonClick}>
                        <img className="h-8 w-8" src={resetStopwatchIcon} alt="Reset" />
                    </button>
                    <button className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleStartButtonClick}>
                        <img className="h-8 w-8" src={isRunning ? pauseStopwatchIcon : startStopwatchIcon} alt="Start/Pause" />
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Stopwatch;