import React, { useState, useEffect } from "react";
import styles from "./Translit.module.css";
import { translitCollection } from "../utils/utils.js";

const Translit = () => {
    const [text, setText] = useState('');
    const [translit, setTranslit] = useState('');

    const handleCopyButtonClick = () => {
        navigator.clipboard.writeText(translit);
    }

    const handleSearchButtonClick = () => {
        window.open(`https://www.google.com/search?q=${translit}`, '_blank');
    }

    useEffect(() => {
        const translitText = (text) => {
            let result = '';
            let i = 0;
            while (i < text.length) {
                let match = '';
                for (let j = 3; j > 0; j--) {
                    const substr = text.substr(i, j).toLowerCase();
                    if (substr in translitCollection) {
                        match = substr;
                        break;
                    }
                }
                if (match) {
                    result += text.substr(i, match.length)[0] === text.substr(i, match.length)[0].toUpperCase() ? translitCollection[match].toUpperCase() : translitCollection[match];
                    i += match.length;
                } else {
                    result += text[i];
                    i++;
                }
            }
            return result;
        }
        setTranslit(translitText(text));
    }, [text]);

    return (
        <div className={styles.translitPage}>
            <div className={styles.translitContainer}>
                <div className={styles.translitTitle}>Transliteration</div>
                <div className={styles.infoRow}>
                    {Object.entries(translitCollection).map(([key, value]) => (
                        <div key={key} className={styles.translitInfo}>
                          <div>{key}</div>
                          <div>{value}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.inputRow}>
                    <textarea className={styles.translitTextArea} value={translit} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className={styles.controlsRow}>
                    <button className={styles.searchButton} onClick={handleSearchButtonClick}>Search</button>
                    <button className={styles.clipboardButton} onClick={handleCopyButtonClick}>Copy</button>
                </div>
            </div>
        </div>
    );
}

export default Translit;