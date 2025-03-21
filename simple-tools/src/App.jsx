import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Todo from './Todo/Todo.jsx';
import Timer from './Timer/Timer.jsx';
import Stopwatch from './Stopwatch/Stopwatch.jsx';
import Translit from './Translit/Translit.jsx';
import Calendar from './Calendar/Calendar.jsx';
import Settings from './Settings/Settings.jsx';
import Weather from './Weather/Weather.jsx';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/timer' element={<Timer />} />
          <Route path='/stopwatch' element={<Stopwatch />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/translit" element={<Translit />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
