import React, { useState } from 'react';

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li>
            <div className='event'>
                <h2>{event.summary}</h2>
                <p>{event.created}</p>
                <p>{event.location}</p>
                <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>

                {showDetails ? (
                    <div className="details">
                        <p>{event.description}</p>
                        <p>Start: {event.start.dateTime || event.start.date}</p>
                        <p>End: {event.end.dateTime || event.end.date}</p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </li>
    );
}

export default Event;