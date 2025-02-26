import React, { useState, useEffect, useRef } from 'react';
import styles from './Timer.module.css';
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
        const handleClick = (e) => {
            if (e.target.classList.contains(styles.setButton)) {
                const value = parseInt(e.target.innerText);
                setTime(prevTime => Math.max(prevTime + (value * 60), 0));
            }

            if (e.target.classList.contains(styles.resetButton)) {
                setTime(300);
                setTimerOn(false);
                clearInterval(intervalRef.current);
            }

            if (e.target.classList.contains(styles.startButton)) {
                setTimerOn(prevTimerOn => {
                    const newTimerOn = !prevTimerOn;
                    return newTimerOn;
                });
            }

            if (e.target.classList.contains(styles.soundButton)) {
                setSoundOn(prevSoundOn => {
                    const newSoundOn = !prevSoundOn;
                    return newSoundOn;
                });
                
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        document.title = timerOn ? secondsToTime(time) : 'Timer - Simple Tools';
    }, [time, timerOn]);

    return (
        <div className={styles.timerPage}>
            <div className={styles.timerContainer}>
                <div className={styles.timerTitle}>Timer</div>
                <div className={styles.topRow}>
                    <div className={styles.setButtonsColumn}>
                        <button className={styles.setButton}>-1</button>
                        <button className={styles.setButton}>-5</button>
                        <button className={styles.setButton}>-10</button>
                    </div>
                    <div className={styles.display} id='display'>
                        <span>{secondsToTime(time)}</span>
                        <button className={styles.soundButton}>
                            <img className={styles.controlButtonIcon} src={soundOn ? soundOnIcon : soundOffIcon} />
                        </button>
                    </div>
                    <div className={styles.setButtonsColumn}>
                        <button className={styles.setButton}>+1</button>
                        <button className={styles.setButton}>+5</button>
                        <button className={styles.setButton}>+10</button>
                    </div>
                </div>
                <div className={styles.bottomRow}>
                    <button className={styles.resetButton} src={resetTimerIcon}>
                        <img className={styles.controlButtonIcon} src={resetTimerIcon} />
                    </button>
                    <button className={styles.startButton}>
                        <img className={styles.controlButtonIcon}
                            src={timerOn ? pauseTimerIcon : startTimerIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Timer;