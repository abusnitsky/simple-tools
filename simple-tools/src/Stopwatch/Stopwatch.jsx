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
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md h-full items-center flex flex-col">
                <div className="text-6xl font-semibold mb-4 w-6/10">
                    <span className="">{secondsToTime(elapsedTime)}</span>
                </div>
                <div className="flex space-x-4 justify-center">
                    <button className="cursor-pointer bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 shadow-md"
                        onClick={handleResetButtonClick}>
                        <img className="h-8 w-8" src={resetStopwatchIcon} alt="Reset" />
                    </button>
                    <button className="cursor-pointer bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 shadow-md"
                        onClick={handleStartButtonClick}>
                        <img className="h-8 w-8" src={isRunning ? pauseStopwatchIcon : startStopwatchIcon} alt="Start/Pause" />
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Stopwatch;