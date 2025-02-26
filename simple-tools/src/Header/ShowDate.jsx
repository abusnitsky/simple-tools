import React, {useState, useEffect} from "react";

function ShowDate() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="header-date">
            {date.toLocaleDateString('de-DE', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: '2-digit'
            })}
        </div>
    );
}

export default ShowDate;