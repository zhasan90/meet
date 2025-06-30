import React from 'react'
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';
import './App.css';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
  }
  useEffect(() => {
    fetchData();
  }, [currentNOE]);

  return (
    <div className='App'>
      <div id='events-list'>
        <CitySearch />
        <EventList events={events} />
      </div>
      <div id="number-of-events">
        <NumberOfEvents />
      </div>
    </div>
  );
}

export default App;
