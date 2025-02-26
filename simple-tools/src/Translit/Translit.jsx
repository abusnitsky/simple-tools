import React, {useState, useEffect} from "react";

const Translit = () => {
    const [text, setText] = useState('');
    const [translit, setTranslit] = useState(''); 

    useEffect(() => {
        const translitText = (text) => {
            const latin = ['a','b','v','g','d','e','yo','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','ts','ch','sh','shch','','y','','e','yu','ya'];
            const cyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
            let result = '';
            let i = 0;
            while (i < text.length) {
                let match = '';
                for (let j = 3; j > 0; j--) {
                    const substr = text.substr(i, j).toLowerCase();
                    if (latin.includes(substr)) {
                        match = substr;
                        break;
                    }
                }
                if (match) {
                    const index = latin.indexOf(match);
                    result += text.substr(i, match.length) === match.toUpperCase() ? cyrillic[index].toUpperCase() : cyrillic[index];
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
        <div>
            <h1>Транслитерация</h1>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <p>{translit}</p>
        </div>
    );
}

export default Translit;