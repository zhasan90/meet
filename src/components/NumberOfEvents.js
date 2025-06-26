import React, { useState } from 'react';

const NumberOfEvents = () => {
    const [numberOfEvents, setNumberOfEvents] = useState(32);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setNumberOfEvents(Number(value));
    };
    return (
        <div className="NumberOfEvents">
            <label htmlFor="number-of-events">Number of Events:</label>
            <input
                type="number"
                id="number-of-events"
                value={numberOfEvents}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default NumberOfEvents;