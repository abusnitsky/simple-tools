import React, { useState } from 'react'

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    return (
        <div className='todo-page'>
            <div className='todo-container'>
                <div className='new-todo-row'></div>
                <input type='text' placeholder='New todo' value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></input>
                <button onClick={() => setTodos([...todos, newTodo])}>Add</button>
                <div className='todo-list'>
                    {todos.map((todo, index) => (
                        <div key={index} className='todo-item'>
                            <input type='checkbox'></input>
                            <span>{todo}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Todo