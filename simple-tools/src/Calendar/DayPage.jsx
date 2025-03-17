import React, { useState, useEffect } from 'react';
import axios from 'axios'
import config from '../config.js'
import API from '../utils/api.js'
import prevIcon from '../assets/arrow_back_ios_24dp.svg';
import addIcon from '../assets/add_24dp.svg';
import cancelIcon from '../assets/cancel_24dp.svg';
import editIcon from '../assets/edit_24dp.svg';
import deleteIcon from '../assets/delete_24dp.svg';


const DayPage = ({ changeView, year, month, day }) => {
  const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2023, month - 1));
  const [editMode, setEditMode] = useState(false);
  const [importantMode, setImportantMode] = useState(false);

  const [eventText, setEventText] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [events, setEvents] = useState([]);

  const toggleEditMode = (mode, time, text) => {
    setEditMode(!editMode);
    setImportantMode(mode);
    setEventTime(time || '');
    setEventText(text || '');
  }
  const editPlaceholder = importantMode ? 'Importent event...' : 'Event...';

  useEffect(() => {
    API.get(`/events?year=${year}&month=${month}&day=${day}`)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [hours, minutes] = eventTime.split(':');
    const eventDate = new Date(year, month - 1, day, hours, minutes);
    API.post("/events", { text: eventText, important: importantMode, date: eventDate })
      .then(response => setEvents([...events, response.data]))
      .catch(error => console.error('Error:', error));
    setEventText('');
    setEventTime('');
    setEditMode(false);
  }

  const handleDelete = (id) => {
    API.delete(`/events/${id}?year=${year}&month=${month}&day=${day}`)
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error:', error));
  }

  return (
    <div>
      <div>
        <button className='bg-gradient-to-r from-gray-400 hover:ring rounded-l-lg w-full px-2 py-1 flex justify-between items-center cursor-pointer'
          onClick={changeView} >
          <img src={prevIcon} alt='back' />
          <span className='font-semibold drop-shadow-sm'>{day} {monthName} {year}</span>
        </button>
      </div>
      <div >
        {editMode ?
          <form className='flex items-center gap-x-1 mt-2 px-2 text-gray-800'
            onSubmit={handleSubmit}>
            <input type='time'
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              className='' />
            <input type='text'
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              className='ring w-full rounded-lg px-2 pb-0.5 outline-0 shadow-sm' placeholder={editPlaceholder} />
            <button className='bg-blue-700 rounded-lg cursor-pointer hover:scale-110 shadow-md'
              type='submit'>
              <img src={addIcon} alt='Add' />
            </button>
            <button className='bg-red-500 rounded-lg cursor-pointer hover:scale-110 shadow-md'
              onClick={() => toggleEditMode(false)}>
              <img src={cancelIcon} alt='Cancel' />
            </button>
          </form> :
          <div className='flex items-center gap-x-2 mt-3 px-3 text-gray-800'>
            <span className='pb-1 drop-shadow-sm'>Add:</span>
            <button className='bg-red-400 rounded-lg px-2 pb-1 hover:ring cursor-pointer shadow-sm'
              onClick={() => toggleEditMode(true)}>Important</button>
            <button className='bg-amber-300 rounded-lg px-2 pb-1 hover:ring cursor-pointer shadow-sm'
              onClick={() => toggleEditMode(false)}>Event</button>
          </div>
        }

      </div>
      <div>
        <div className='grid grid-cols-1 gap-1 mt-3'>
          {events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event, i) => (
              <div key={i} className='bg-gray-100 text-gray-800 flex justify-between items-center p-1 rounded-lg shadow-sm'>
                <div className={`${event.important? 'bg-red-400' : 'bg-amber-300'} px-1.5 pb-0.5 rounded-l-md shadow-sm`}>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className='w-full pl-2 pb-0.5'>{event.text}</div>
                <div className='flex gap-x-0.5'>
                  <button onClick={() => {
                    toggleEditMode(event.important, new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event.text);
                    handleDelete(event._id);
                  }}>
                    <img src={editIcon} alt='Edit'
                      className='bg-amber-400 hover:scale-110 cursor-pointer rounded-l-sm shadow-sm' />
                  </button>
                  <button onClick={() => handleDelete(event._id)}>
                    <img src={deleteIcon} alt='Delete'
                      className='bg-red-500 hover:scale-110 cursor-pointer rounded-r-sm shadow-sm' />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div >
  );
};

export default DayPage;