export const translitCollection = {
    "a": "а",
    "b": "б",
    "v": "в",
    "g": "г",
    "d": "д",
    "e": "е",
    "yo": "ё",
    "ыo": "ё",
    "zh": "ж",
    "зh": "ж",
    "z": "з",
    "i": "и",
    "y": "й",
    "k": "к",
    "l": "л",
    "m": "м",
    "n": "н",
    "o": "о",
    "p": "п",
    "r": "р",
    "s": "с",
    "t": "т",
    "u": "у",
    "f": "ф",
    "h": "х",
    "c": "ц",
    "ch": "ч",
    "цh": "ч",
    "sh": "ш",
    "сh": "ш",
    "shh": "щ",
    "шh": "щ",
    "y": "ы",
    "ä": "э",
    "yu": "ю",
    "ыu": "ю",
    "ya": "я",
    "ыa": "я",
    "ö": "ь",
    "ü": "ъ"
};

export const secondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};