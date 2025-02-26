import React, { useState, useEffect } from "react";



function Clock() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="header-clock">
            <span>{time.toLocaleTimeString()}</span>
        </div>
    );
}

export default Clock;