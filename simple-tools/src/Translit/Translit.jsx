import React, { useState, useEffect } from "react";
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

    const filterDuplicates = (collection) => {
        const uniqueValues = new Set();
        const filteredCollection = {};

        for (const [key, value] of Object.entries(collection)) {
            if (!uniqueValues.has(value)) {
                uniqueValues.add(value);
                filteredCollection[key] = value;
            }
        }

        return filteredCollection;
    }

    //const filteredTranslitCollection = filterDuplicates(translitCollection);
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
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md">
                <div className="grid grid-cols-17 border-t">
                    {Object.entries(filterDuplicates(translitCollection)).map(([key, value]) => (
                        <div className="bg-gray-100 flex flex-col justify-center items-center border-b"
                            key={key}>
                            <div>{key}</div>
                            <div>{value}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-2">
                    <textarea className="bg-gray-100 w-full p-2 border border-gray-300 h-24 rounded-lg focus:outline-none"
                        value={translit}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button className="bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-lg"
                        onClick={handleSearchButtonClick}>
                        Search
                    </button>
                    <button className="bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-lg"
                        onClick={handleCopyButtonClick}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Translit;