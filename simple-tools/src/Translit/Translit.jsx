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
            <div className="bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md h-full">
                <div className="grid grid-cols-17 gap-1">
                    {Object.entries(filterDuplicates(translitCollection)).map(([key, value]) => (
                        <div className="bg-gray-100 flex flex-col justify-center items-center ring-1 ring-gray-300 shadow-sm"
                            key={key}>
                            <div>{key}</div>
                            <div>{value}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-3">
                    <textarea className="bg-gray-100 w-full p-2 border border-gray-300 h-32 rounded-b-lg focus:outline-none shadow-sm"
                        value={translit}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="flex justify-between mt-3">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 pb-1 rounded-lg shadow-lg"
                        onClick={handleSearchButtonClick}>
                        Search
                    </button>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 pb-1 rounded-lg shadow-lg"
                        onClick={handleCopyButtonClick}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Translit;