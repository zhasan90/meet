import React from 'react'
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';


const App = () => {
  return (
    <div className='App'>
      <div id='events-list'>
        <CitySearch />
        <EventList />
      </div>
      <div id="number-of-events">
        <NumberOfEvents />
      </div>
    </div>
  );
}

export default App;
