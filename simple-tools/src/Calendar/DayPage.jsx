import React, { useState, useEffect, use } from 'react';
import axios from 'axios'
import config from '../config.js'
import prevIcon from '../assets/arrow_back_ios_24dp.svg';
import addIcon from '../assets/add_24dp.svg';
import cancelIcon from '../assets/cancel_24dp.svg';


const DayPage = ({ changeView, year, month, day }) => {
  const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2023, month - 1));
  const [editMode, setEditMode] = useState(false);
  const [importantMode, setImportantMode] = useState(false);
  const [eventText, setEventText] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [events, setEvents] = useState([]);

  const toggleEditMode = (mode) => {
    setEditMode(!editMode);
    setImportantMode(mode);
  }
  const editPlaceholder = importantMode ? 'Importent event...' : 'Event...';

  /*   useEffect(() => {
      axios.get(`${config.EVENTS_API_URL}?date=${year}-${month}-${day}`)  
        .then(response => setEvents(response.data))
        .catch(error => console.error('Error:', error));
    }, [year, month, day]); */

  /*   useEffect(() => {
      console.log('eventTime:', eventTime);
    }, [eventTime]); */

  useEffect(() => {
    axios.get(`${config.EVENTS_API_URL}?year=${year}&month=${month}&day=${day}`)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes] = eventTime.split(':');
    const eventDate = new Date(year, month - 1, day, hours, minutes);
    axios.post(config.EVENTS_API_URL, { text: eventText, important: importantMode, date: eventDate })
      .then(response => setEvents([...events, response.data]))
      .catch(error => console.error('Error:', error));
    setEventText('');
  }

  return (
    <div>
      <div>
        <button className='bg-gray-400 hover:bg-gray-500 rounded-l-lg w-full px-2 py-1 flex justify-between items-center'
          onClick={changeView} >
          <img src={prevIcon} alt='back' />
          <span className='font-semibold'>{day} {monthName} {year}</span>
        </button>
      </div>
      <div >
        {editMode ?
          <form className='flex items-center gap-x-1 mt-2'
            onSubmit={handleSubmit}>
            <input type='time'
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className='' />
            <input type='text'
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              className='ring w-full rounded-lg px-2' placeholder={editPlaceholder} />
            <button className='bg-green-500 rounded-lg'
              type='submit'>
              <img src={addIcon} alt='Add' />
            </button>
            <button className='bg-red-500 rounded-lg'
              onClick={() => toggleEditMode(false)}>
              <img src={cancelIcon} alt='Cancel' />
            </button>
          </form> :
          <div className='flex items-center gap-x-1 mt-2'>
            <span className='pb-1'>Add:</span>
            <button className='bg-red-500 rounded-lg px-2 pb-1'
              onClick={() => toggleEditMode(true)}>Important</button>
            <button className='bg-amber-500 rounded-lg px-2 pb-1'
              onClick={() => toggleEditMode(false)}>Event</button>
          </div>
        }

      </div>
      <div>
        <div className='grid grid-cols-1 gap-1 mt-2'>
          {events.map((event, i) => (
            <div key={i} className='bg-gray-200 flex justify-between items-center p-2 rounded-lg'>
              <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span>{event.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayPage;