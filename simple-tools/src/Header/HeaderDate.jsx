import React, { useState, useEffect } from "react";

function HeaderDate() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span>
            {date.toLocaleDateString('de-DE', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: '2-digit'
            })}
        </span>
    );
}

export default HeaderDate;