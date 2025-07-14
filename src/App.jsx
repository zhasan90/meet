import React from 'react'
import { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    const locations = extractLocations(allEvents);
    setAllLocations(locations);
  }
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className='App'>
      <div id='events-list'>
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        <EventList events={events} />
      </div>
      <div id="number-of-events">
        <NumberOfEvents />
      </div>
    </div>
  );
}

export default App;
