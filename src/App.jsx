import React from 'react'
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';


const App = () => {
  return (
    <div className='App'>
      <div id='events-list'>
        <CitySearch />
        <EventList />
      </div>
    </div>
  );
}

export default App;
