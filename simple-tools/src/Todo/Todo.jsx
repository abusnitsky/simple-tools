import React, { useState, useEffect, use } from 'react'
import axios from 'axios'
//import styles from './Todo.module.css'
import config from '../config.js'
import addIcon from '../assets/add_24dp.svg'

function Todo() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [todoDone, setTodoDone] = useState(false);
    const [filter, setFilter] = useState('active');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(config.TODO_API_URL, { text: todoText, done: todoDone })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Error:', error));
        setTodoText('');
    }

    const toggleDone = (id, done) => {
        axios.patch(`${config.TODO_API_URL}/${id}`, { done: !done })
            .then(response => setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? response.data : todo)))
            .catch(error => console.error('Error:', error));
    }

    const handleDelete = (id) => {
        axios.delete(`${config.TODO_API_URL}/${id}?status=${filter}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        axios.get(`${config.TODO_API_URL}?status=${filter !== "all" ? filter : ""}`)
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error:', error));
    }, [filter]);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg m-3 p-6 w-full max-w-md">
                <div className="mb-4">
                    <form className="flex items-center" onSubmit={handleSubmit}>
                        <input
                            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                            type="text"
                            placeholder="New Todo"
                            value={todoText}
                            onChange={(e) => setTodoText(e.target.value)}
                        />
                        <button
                            className="bg-blue-800 hover:bg-blue-700 text-white p-2 rounded-r-lg"
                            type="submit"
                        >
                            <img src={addIcon} alt="Add" />
                        </button>
                    </form>
                </div>
                <div>
                    <div className="flex justify-between mb-4">
                        <button
                            className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setFilter("active")}
                        >
                            Active
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${filter === 'done' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setFilter("done")}
                        >
                            Done
                        </button>
                    </div>
                    <div>
                        {todos.map(({ _id, text, done }) => (
                            <div className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded-lg" key={_id}>
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    checked={done}
                                    onChange={() => toggleDone(_id, done)}
                                />
                                <span className={`flex-grow ${done ? 'line-through text-gray-500' : ''}`}>{text}</span>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(_id)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo