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
            <button className='bg-green-500 rounded-lg cursor-pointer'
              type='submit'>
              <img src={addIcon} alt='Add' />
            </button>
            <button className='bg-red-500 rounded-lg cursor-pointer'
              onClick={() => toggleEditMode(false)}>
              <img src={cancelIcon} alt='Cancel' />
            </button>
          </form> :
          <div className='flex items-center gap-x-1 mt-2'>
            <span className='pb-1'>Add:</span>
            <button className='bg-red-500 rounded-lg px-2 pb-1 hover:ring cursor-pointer'
              onClick={() => toggleEditMode(true)}>Important</button>
            <button className='bg-amber-400 rounded-lg px-2 pb-1 hover:ring cursor-pointer'
              onClick={() => toggleEditMode(false)}>Event</button>
          </div>
        }

      </div>
      <div>
        <div className='grid grid-cols-1 gap-1 mt-2'>
          {events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event, i) => (
              <div key={i} className='bg-gray-200 flex justify-between items-center p-2 rounded-lg'>
                <div className={`${event.important? 'bg-red-500' : 'bg-amber-400'} px-1 rounded-lg`}>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className='w-full pl-2'>{event.text}</div>
                <div className='flex gap-x-1'>
                  <button onClick={() => {
                    toggleEditMode(event.important, new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), event.text);
                    handleDelete(event._id);
                  }}>
                    <img src={editIcon} alt='Edit'
                      className='bg-amber-500 hover:bg-amber-600 cursor-pointer' />
                  </button>
                  <button onClick={() => handleDelete(event._id)}>
                    <img src={deleteIcon} alt='Delete'
                      className='bg-red-500 hover:bg-red-600 cursor-pointer' />
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