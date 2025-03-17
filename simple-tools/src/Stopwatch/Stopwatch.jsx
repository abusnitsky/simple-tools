import React, { useState, useEffect, useRef, use } from "react";
import startStopwatchIcon from '../assets/start_32dp.svg';
import resetStopwatchIcon from '../assets/stop_32dp.svg';
import pauseStopwatchIcon from '../assets/pause_32dp.svg';
import { secondsToTime } from '../utils/utils.js';
import PageBody from "../Components/Containers/PageBody.jsx";
import MainContainer from "../Components/Containers/MainContainer.jsx";
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
        <PageBody>
            <MainContainer>
                <div className="text-6xl font-semibold mb-3 w-6/10 border-b-2 border-gray-300 pl-1.5 pb-1.5 drop-shadow-lg">
                    <span className="text-gray-800">{secondsToTime(elapsedTime)}</span>
                </div>
                <div className="flex space-x-5 justify-center">
                    <button className="cursor-pointer bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 shadow-md"
                        onClick={handleResetButtonClick}>
                        <img className="h-8 w-8" src={resetStopwatchIcon} alt="Reset" />
                    </button>
                    <button className="cursor-pointer bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 shadow-md"
                        onClick={handleStartButtonClick}>
                        <img className="h-8 w-8" src={isRunning ? pauseStopwatchIcon : startStopwatchIcon} alt="Start/Pause" />
                    </button>
                </div>
            </MainContainer>
        </PageBody>
    );

};

export default Stopwatch;