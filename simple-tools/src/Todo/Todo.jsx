import React, { useState, useEffect, use } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:8080/todos';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [todoDone, setTodoDone] = useState(false);
    const [filter, setFilter] = useState('active');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API_URL, { text: todoText, done: todoDone })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Error:', error));
        setTodoText('');
    }

    const toggleDone = (id, done) => {
        axios.patch(`${API_URL}/${id}`, { done: !done })
            .then(response => setTodos(todos.map(todo => todo._id === id ? response.data : todo))
            )
            .catch(error => console.error('Error:', error));
    }

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/${id}?status=${filter}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        axios.get(`${API_URL}?status=${filter !== "all" ? filter : ""}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }, [filter]);

    return (
        <div className='todo-page'>
            <div className='todo-container'>
                <div className='new-todo-row'>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='New Todo'
                            value={todoText} onChange={(e) => setTodoText(e.target.value)}></input>
                        <button type='submit'>Add</button>
                    </form>
                </div>
                <div className='todo-list-row'>
                    <div className='todo-list-nav-row'>
                        <button onClick={() => setFilter("active")}>Active</button>
                        <button onClick={() => setFilter("done")}>Done</button>
                    </div>
                    <div className='todo-list'>
                        {todos.map(({ _id, text, done }) => (
                            <div key={_id}>
                                <input type='checkbox'
                                    checked={done}
                                    onChange={() => toggleDone(_id, done)}
                                />
                                <span>{text}</span>
                                <button onClick={() => handleDelete(_id)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Todo