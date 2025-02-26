import React, { useState, useEffect, useRef, use } from "react";
import styles from "./Stopwatch.module.css";
import startStopwatchIcon from '../assets/start_32dp.svg';
import resetStopwatchIcon from '../assets/stop_32dp.svg';
import pauseStopwatchIcon from '../assets/pause_32dp.svg';
import { secondsToTime } from '../utils/utils.js';

const Stopwatch = () => {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

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
        const handleClick = (e) => {
            if (e.target.classList.contains(styles.stopwatchStartButton)) {
                setIsRunning(prevIsRunning => !prevIsRunning);
            }

            if (e.target.classList.contains(styles.stopwatchResetButton)) {
                setElapsedTime(0);
                setIsRunning(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

   // useEffect(() => document.title = isRunning ? secondsToTime(elapsedTime) : 'Stopwatch - Simple Tools', [elapsedTime]);
    useEffect(() => {
        document.title = isRunning ? secondsToTime(elapsedTime) : 'Stopwatch - Simple Tools';
    }, [elapsedTime, isRunning]);

    return (
        <div className={styles.stopwatchPage}>
            <div className={styles.stopwatchContainer}>
                <div className={styles.stopwatchTitle}>Stopwatch</div>
                <div className={styles.stopwatchDisplay}>
                    <span>{secondsToTime(elapsedTime)}</span>
                </div>
                <div className={styles.stopwatchControls}>
                    <button className={styles.stopwatchResetButton}>
                        <img className={styles.controlButtonIcon} src={resetStopwatchIcon} />
                    </button>
                    <button className={styles.stopwatchStartButton}>
                        <img className={styles.controlButtonIcon} src={isRunning ? pauseStopwatchIcon : startStopwatchIcon} />
                    </button>
                </div>
            </div>
        </div>
    );

};

export default Stopwatch;